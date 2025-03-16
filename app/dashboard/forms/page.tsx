import { getForms } from '@/server/getForms'
import FormList from '@/components/FormList'
import GenerateFormInput from '@/components/GenerateFormInput'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import React from 'react'

const MyForm = async () => {
  const forms = await getForms()

  return (
    <div>
      <section className='flex items-center justify-between max-w-7xl mx-auto mb-4'>
        <h1 className='font-bold text-xl'>MY FORMS</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline'>
              {' '}
              <Plus /> CREATE NEW FORM
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>WRITE PROMPT</DialogTitle>
              <DialogDescription>
                WRITE A CLEAN PROMPT TO GET A GOOD RESULT
              </DialogDescription>
            </DialogHeader>
            <GenerateFormInput />
          </DialogContent>
        </Dialog>
      </section>
      <div className='grid grid-cols-3 gap-2'>
        {forms?.data?.map((form:any, index: number) => (
          <FormList key={index} form={form} />
        ))}
      </div>
    </div>
  )
}

export default MyForm