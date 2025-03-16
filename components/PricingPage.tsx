'use client'

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import pricingPlan, { PricingPlan } from '@/lib/pricingplan'
import { Badge } from './ui/badge'
import { useRouter } from 'next/navigation'
import { getStripe } from '@/lib/stripe-client'

type Props = {
	userId: string | undefined
}

const PricingPage : React.FC<Props> = ({userId}) => {
	const router = useRouter()

	const checkoutHandler = async (price: number, plan: string) => {
		if (!userId) {
			router.push('/sign-in')
		}
		if (price === 0) {
			return
		}
		try {
			const { sessionId } = await fetch('/api/stripe/checkout-session', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ price, userId, plan })
			}).then((res) => res.json())
			const stripe = await getStripe()
			stripe?.redirectToCheckout({sessionId})
		} catch (error) {
			console.log(error)
		}
	}

  return (
		<div>
			<div className='text-center mt-10 mb-16'>
				<h1 className='font-extrabold mb-4 text-3xl'>PLAN AND PRICING</h1>
				<p>RECEIVE UNLIMITED CREDITS WHEN YOU PAY US AND SAVE THE PLANS</p>
			</div>
			<div className='grid grid-cols-3 gap-10'>
				{pricingPlan.map((plan: PricingPlan, index: number) => (
					<div key={index} className='relative group'>
						<div className='absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-indigo-600 to bg-violet-600 blur-lg'></div>
						<Card className='w-[350px] relative flex flex-col justify-between'>
						{/* <Card className='w-[350px] relative bg-gradient-to-r from-indigo-600 to bg-violet-600'> */}
							<CardHeader className='flex flex-row items-center gap-2'>
								<CardTitle>{plan.level}</CardTitle>
								{plan.level === 'PRO' && <Badge className='rounded-full'>POPULAR</Badge>}
							</CardHeader>
							<CardContent className='flex-1'>
								<p className='text-2xl font-bold'>{plan.price}</p>
								<ul className='mt-4 space-y-2'>
									{plan.services.map((item: string, index: number) => (
										<li className='flex items-center' key={index}>
											<span className='text-primary mr-2'>•</span> {item}
										</li>
									))}
								</ul>
							</CardContent>
							<CardFooter>
								<Button 
									variant='outline' 
									className='font-bold w-full' 
									onClick={() => checkoutHandler(plan.level === 'PRO' ? 49 : plan.level === 'ULTIMA' ? 99 : 0, plan.level)}
								>
									GET STARTED WITH {plan.level}
								</Button>
							</CardFooter>
						</Card>
					</div>
				))}
			</div>
		</div>
  )
}

export default PricingPage
