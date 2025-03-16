import AiGeneratedForm from '@/components/AiGeneratedForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import prisma from '@/lib/prisma'
import React from 'react'

const SubmitForm = async ({ params }: { params: Promise<{ formId: string }> }) => {
  const formId = (await params).formId
  if (!formId) {
    return <h1>No form id found for id {formId}</h1>;
  }
  const form : any = await prisma.form.findUnique({
    where: {
      id: Number(formId),
    },
  })
	let formJsonData
  try {
    const cleanedContent =
      typeof form.content === 'string'
        ? form.content.replace(/```json|```/g, '').trim()
        : form.content

    formJsonData = typeof cleanedContent === 'string' ? JSON.parse(cleanedContent) : cleanedContent
  } catch (error) {
    console.error('Error parsing form JSON:', error)
    return <h1>Error: Invalid form data</h1>
  }
	
  return (
		<div className='flex items-center justify-center min-h-screen'>
			<Card className='w-full max-w-xl py-10'>
				<CardHeader>
					<CardTitle>
						<h1 className='font-bold text-2xl text-center'>
							{formJsonData.formTitle || 'NA'}
						</h1>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<AiGeneratedForm form={form} isEditMode={false} />
				</CardContent>
			</Card>
		</div>
	)		
}

export default SubmitForm