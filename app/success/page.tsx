'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const SuccessPage = () => {
	const router = useRouter()

  return (
    <div className='flex flex-col items-center justify-center h-screen text-center px-4'>
			<h1 className='font-bold mb-4 text-4xl'>SUCCESS</h1>
			<p className='mb-6 max-w-md'>YOU HAVE SUCCESSFULLY UPGRADED YOUR PLAN AND NOW YOU CAN START CREATING MORE FORMS</p>
			<Button onClick={() => router.push('/')}>
				START CREATING FORMS
			</Button>
    </div>
  )
}

export default SuccessPage
