'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Edit2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Form } from '@/types/form'
import { deleteForm } from '@/server/deleteForm'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

type Props = {
  form: Form
}

const FormList: React.FC<Props> = ({ form }) => {
  const router = useRouter()

  const deleteFormHandler = async (formId: number) => {
    const data = await deleteForm(formId)

    if (data.success) {
      toast.success(data.message)
    } else {
      toast.error(data.message)
    }
  }

  let formTitle = 'UNTITLED FORM'
  try {
    if (form.content) {
      const cleanedContent =
        typeof form.content === 'string'
          ? form.content.replace(/```json|```/g, '').trim()
          : JSON.stringify(form.content) // Convert objects to a string if necessary

      const formJsonData = JSON.parse(cleanedContent)

      if (formJsonData?.formTitle) {
        formTitle = formJsonData.formTitle.toUpperCase()
      }
    }
  } catch (error) {
    console.error('Error parsing form JSON:', error)
  }

  return (
    <div>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>{formTitle}</CardTitle>
          <CardDescription>DEPLOY YOUR PROJECT IN ONE CLICK</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href={`/dashboard/forms/${form.id}/submissions`}>
            <Button variant={'link'}>SUBMISSIONS - {form.submissions}</Button>
          </Link>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button variant='outline' onClick={() => router.push(`/dashboard/forms/edit/${form.id}`)}>
            <Edit2 /> EDIT
          </Button>
          <Button onClick={() => deleteFormHandler(form.id)}>
            <Trash2 /> DELETE
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default FormList
