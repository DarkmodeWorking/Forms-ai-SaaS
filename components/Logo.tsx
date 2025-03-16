import { AudioWaveform } from 'lucide-react'
import React from 'react'

const Logo = () => {
  return (
    <div className='flex items-center gap-5'>
      <AudioWaveform className='text-primary' />
			<h1 className='text-black dark:text-white font-extrabold text-2xl'>FORMS • AI </h1>
    </div>
  )
}

export default Logo