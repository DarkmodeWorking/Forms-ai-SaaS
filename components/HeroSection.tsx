'use client'

import React, { useState } from 'react'
import GenerateFormInput from './GenerateFormInput'
import { Button } from './ui/button'

type SuggestionText = {
	label: string,
	text: string
}

const suggestionButtonText : SuggestionText[] = [
	{
		label: 'JOB APPLICATION FORM',
		text: 'Develop a basic job application form that serves as a one-page solution form collecting essential information from applicants.'
	},
	{
		label: 'REGISTRATION FORM',
		text: 'Create a course registration form suitable form any school or instituition.'
	},
	{
		label: 'FEEDBACK FORM',
		text: 'Create a client feedback form to gather valuable insights from any clients.'
	}
]

type Props = {
	totalForms: number
	isSubscribed: boolean
}

const HeroSection: React.FC<Props> = ({totalForms, isSubscribed}) => {
	const [text, setText] = useState<string>('')

  return (
    <section>
			<div className='relative'>
				<div className='absolute inset-0 bg-gradient-to-r from-indigo-600 to bg-violet-600 blur-2xl opacity-50 -z-10'></div>
					<div className='container mx-auto text-center relative'>
						<h1 className='text-4xl font-bold'>
							BUILD FORMS WITH AI
						</h1>
						<p className='mt-4 text-lg'>
							WITH THE POWER OF ARTIFICIAL INTELLIGENCE BUILD FORMS EFFORTLESSLY AND EFFICIENTLY
						</p>
					</div>
				</div>
				<GenerateFormInput text={text} totalForms={totalForms} isSubscribed={isSubscribed} />
				<div className='grid grid-cols-4 gap-3'>
					{suggestionButtonText.map((item: SuggestionText, index: number) => (
						<Button onClick={() => setText(item.text)} key={index} className='rounded-full h-10' variant='outline'>{item.label}</Button>
					))}
				</div>
    </section>
  )
}

export default HeroSection