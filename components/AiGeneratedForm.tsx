'use client'

import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
// import { Textarea } from './ui/textarea'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
// import { RadioGroup, RadioGroupItem } from './ui/radio-group'
// import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import { publishForm } from '@/server/publishForm'
import FormPublishDialog from './FormPublishDialog'
import { submitForm } from '@/server/submitForm'
import toast from 'react-hot-toast'
import { Fields } from '@/types/form'

type Props = { form: any; isEditMode: boolean }

const AiGeneratedForm: React.FC<Props> = ({ form, isEditMode }) => {
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false)
	const [formData, setFormData] = useState<any>({})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({...formData, [name]: value})
	}

  let formJsonData
  try {
    const cleanedContent =
      typeof form.content === 'string'
        ? form.content.replace(/```json|```/g, '').trim()
        : form.content

    formJsonData = typeof cleanedContent === 'string' ? JSON.parse(cleanedContent) : cleanedContent

    if (!formJsonData?.formFields) {
      throw new Error('Invalid form structure')
    }
  } catch (error) {
    console.error('Error parsing form JSON:', error)
    return <p>Error: Invalid form data</p>
  }

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditMode) {
      await publishForm(form.id)
			setSuccessDialogOpen(true)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
		const data = await submitForm(form.id, formData)
    if (data?.success) {
      toast.success(data.message)
      setFormData({})
    }
    if (!data?.success) {
      toast.error(data?.message || 'Something went wrong')
    }
  }

  return (
    <div>
      <form onSubmit={isEditMode ? handlePublish : handleSubmit}>
        {formJsonData.formFields.map((item: Fields, index: number) => (
          <div key={index} className='mb-4'>
            <Label>{item.label}</Label>
            <Input
              type='text'
              name={item.name}
              placeholder={item.placeholder}
              required={!isEditMode && true}
              onChange={handleChange}
            />
          </div>
        ))}
        <Button type='submit'>{isEditMode ? 'Publish' : 'Submit'}</Button>
      </form>
      <FormPublishDialog
        formId={form.id}
        open={successDialogOpen}
        onOpenChange={setSuccessDialogOpen}
      />
    </div>
  )
}

export default AiGeneratedForm
