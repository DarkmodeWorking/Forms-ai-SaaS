import Link from 'next/link'
import React from 'react'
import { Progress } from './ui/progress'
import { getForms }  from '@/server/getForms'
import {getUserSubscription}  from '@/server/userSubscription'
import { MAX_FREE_FORM } from '@/lib/utils'

type Props = {
  userId:string | undefined;
}

const UpgradeButton : React.FC<Props> = async ({userId}) => {
  const forms = await getForms(); 
  const isSubscribed = await getUserSubscription(userId!);

  const formsGenerated = forms?.data?.length;
  const percentage = (formsGenerated! / MAX_FREE_FORM) * 100;


  return (
    <div className='m-3'>
      {isSubscribed ? (
        <span className='text-sm'>
          YOU HAVE AN ACTIVE SUBSCRIPTION PLAN, YOU CAN CONTINUE WITH MORE FORMS
        </span>
      ) : (
        <>
          <Progress value={percentage}/>
          <p>
            0 OF 3 FORMS GENERATED.{' '}
            <Link
              href={'/dashboard/upgrade'}
              className='text-primary hover:underline'
            >
              {' '}
              UPGRADE{' '}
            </Link>{' '}
            FOR UNLIMITED FORMS
          </p>
        </>
      )}
    </div>
  );
};

export default UpgradeButton;