import { getForms } from '@/server/getForms'
import { getUserSubscription } from '@/server/userSubscription'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import PricingPage from '@/components/PricingPage'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const HomePage = async () => {
  const user = await currentUser()
  const forms = await getForms()
  const totalFormsCreated = forms?.data?.length || 0 as number
  const isSubscribed = await getUserSubscription(user?.id as string) as boolean

  return (
    <div className='grid items-center justify-items-center min-h-screen p-8 gap-16 sm:p-20'>
			<HeroSection totalForms={totalFormsCreated} isSubscribed={isSubscribed} />
			<PricingPage userId={user?.id} />
			<Footer />
			
    </div>
  )
}

export default HomePage