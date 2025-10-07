import IconButton from '@/components/icon-button'
import Avatar from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ImageIcon } from 'lucide-react'

export default function CreatePost() {
  return (
    <div className='flex gap-3 border-b px-3 py-3'>
      <div>
        <Avatar img={null} />
      </div>

      <div className='flex w-full flex-col gap-4'>
        <div>
          <Textarea />
        </div>

        <form className='flex items-center justify-between gap-4'>
          <div className='flex shrink-0 gap-2'>
            <IconButton icon={ImageIcon} />
          </div>

          <Button type='submit' className='px-6 font-semibold'>
            Post
          </Button>
        </form>
      </div>
    </div>
  )
}
