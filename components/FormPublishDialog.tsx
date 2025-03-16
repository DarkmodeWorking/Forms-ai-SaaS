import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { LinkIcon } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import toast from 'react-hot-toast'

type Props = {
	formId: number
	open: boolean
	onOpenChange: (open: boolean) => void
}

const FormPublishDialog : React.FC<Props> = ({ formId, open, onOpenChange }) => {
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

	const copyClipboard = () => {
		const link = `${BASE_URL}/forms/${formId}`
		navigator.clipboard.writeText(link)
		toast.success('Copied to Clipboard')
	}
	
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>SUCCESSFULLY PUBLISHED</DialogTitle>
					<DialogDescription>
						SHARE YOUR FORM AND START COLLECTING RESPONSES
					</DialogDescription>
				</DialogHeader>
				<div className='font-bold text-sm'>
					<p>YOUR FORM IS NOW LIVE AND BE ACCESSED AT THE FOLLOWING URL: </p>
					<br />
					<div className='flex items-center gap-4 font-bold'>
						<LinkIcon />
						<Input 
							placeholder='link' 
							disabled 
							className='w-full outline-none' 
							value={`${BASE_URL}/forms/${formId}`} 
						/>
						<Button onClick={copyClipboard}>COPY</Button>
					</div>
				</div>
			</DialogContent>
    </Dialog>
  )
}

export default FormPublishDialog