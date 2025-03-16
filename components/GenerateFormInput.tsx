'use client'

import React, { ChangeEvent, useActionState, useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useFormStatus } from 'react-dom'
import { Lock, Sparkles } from 'lucide-react'
import { generateForm } from '@/server/generateForm'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { MAX_FREE_FORM } from '@/lib/utils'

type InitialState = {
  message: string,
  success: boolean,
  data?: any
}

type Props = {
  text?: string,
  totalForms?: number,
  isSubscribed?: boolean
}

const initialState : InitialState = {
  message: '',
  success: false
}

const GenerateFormInput : React.FC<Props> = ({text, totalForms, isSubscribed}) => {
  const [description, setDescription] = useState<string | undefined>('')
  const [state, formAction] = useActionState(generateForm, initialState)
  const router = useRouter()

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  useEffect(() => {
    setDescription(text)
  }, [text])

  useEffect(() => {
    if (state.success) {
      toast(state.message)
      router.push(`/dashboard/forms/edit/${state.data.id}`)
    }
    else if (state.message) {
      toast.error(state.message)
    }
  }, [router, state])

  return (
    <form action={formAction} className='flex items-center gap-4 my-8'>
			<Input 
        id='description' 
        name='description' 
        value={description} 
        onChange={changeEventHandler} 
        className='font-bold' 
        type='text' 
        placeholder='WRITE A PROMPT TO GENERATE FORM ...'
        required
      />
      {
        isSubscribed && totalForms! <= MAX_FREE_FORM ? <SubmitButton /> : <Button disabled className='h-12'> <Lock /> UPGRADE PLAN </Button>
      }
    </form>
  )
}

export default GenerateFormInput

const SubmitButton = () => {
  const {pending} = useFormStatus()

  return (
    <Button disabled={pending} className='font-bold'>
      <Sparkles className='mr-2' />
      {
        pending ? (
          <span>GENERATING FORM ...</span>
        ) : (
          'GENERATE FORM'
        )
      }
    </Button>
  )
}

