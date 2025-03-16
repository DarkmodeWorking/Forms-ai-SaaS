'use server'

import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { z } from 'zod'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { revalidatePath } from 'next/cache'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export const generateForm = async (prevState: unknown, formData: FormData) => {
    try {
        const user = await currentUser()
        if (!user) {
            return {
                success: false,
                message: 'User not found'
            }
        }
        const schema = z.object({
            description: z.string().min(1, 'Description is required')
        })
        const result = schema.safeParse({
            description: formData.get('description') as string
        })
        if (!result.success) {
            return {
                success: false,
                message: 'Invalid Form Data',
                error: result.error.errors
            }
        }
        const description = result.data.description
        if (!process.env.GEMINI_API_KEY) {
            return {
                success: false,
                message: 'Gemini API key not found'
            }
        }
        const prompt = `Generate a JSON response for a form with the following structure. Ensure the keys and format remain constant in every response.
        {
        "formTitle": "string", // The title of the form
        "formFields": [        // An array of fields in the form
            {
            "label": "string", // The label to display for the field
            "name": "string",  // The unique identifier for the field (used for form submissions)
            "type": "string", // The type of input
            "placeholder": "string", // The placeholder text for the field
            "required": boolean // The boolean field for important required fields
            }
        ]
        }
        Requirements:
        - Use only the given keys: "formTitle", "formFields", "label", "name", "placeholder".
        - Always include at least 3 fields in the "formFields" array.
        - Keep the field names consistent across every generation for reliable rendering.
        - Provide meaningful placeholder text for each field based on its label.`

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })
        const response = await model.generateContent(`${description} ${prompt}`)
        const formContent = response.response.text()
        console.log('AI Generated Form ->', formContent)
        if (!formContent) {
            return {
                success: false,
                message: 'Failed to generate Form Content'
            }
        }
        // let formJsonData
        // try {
        //     const cleanedFormContent = formContent.replace(/```json|```/g, "").trim()
        //     formJsonData = JSON.parse(cleanedFormContent)
        // } catch (error) {
        //     console.log('Error Parsing JSON', error)
        //     return {
        //         success: false,
        //         message: 'Generated Form Content is not valid JSON'
        //     }
        // }
        const form = await prisma.form.create({
            data: {
                ownerId: user.id,
                content: formContent
            }
        })
        revalidatePath('/dashboard/forms')
        return {
            success: true,
            message: 'FORM GENERATED SUCCESSFULLY',
            data: form
        }
    } catch (error) {
        console.log('Error generated Form', error)
        return {
            success: false,
            message: 'ERROR OCCURRED WHILE GENERATING FORM'
        }
    }
    finally {
        await prisma.$disconnect() 
    }
}
