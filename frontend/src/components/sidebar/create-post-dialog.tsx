import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import CreatePostForm from '@/features/post/components/create-post-form'
import { PlusCircleIcon } from 'lucide-react'
import { useState } from 'react'

export default function CreatePostDialog() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className='group cursor-pointer py-2'>
        <div className='group-hover:bg-hover rounded-full p-3 transition-[background-color] ease-out group-hover:transition-none md:flex md:gap-5 [&_svg]:size-6 md:[&_svg]:size-7'>
          <PlusCircleIcon className='size-6 md:size-7' />
          <span className='hidden md:block md:truncate md:text-xl'>
            Create post
          </span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create post</DialogTitle>
        </DialogHeader>
        <CreatePostForm
          onSuccess={() => {
            setIsOpen(false)
          }}
          className='border-none'
        />
      </DialogContent>
    </Dialog>
  )
}
