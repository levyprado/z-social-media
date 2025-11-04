import IconButton from '@/components/icon-button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CopyIcon, ShareIcon } from 'lucide-react'

type ShareButtonProps = {
  postId: number
  size: 'sm' | 'md'
}

export default function ShareButton({ size, postId }: ShareButtonProps) {
  const postUrl = `${document.location.href}post/${postId}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl)
    } catch (error) {
      console.error(error)
      // Throw toast Error
    }
  }

  const handleSharePost = async () => {
    const shareData: ShareData = {
      title: 'Z',
      text: 'Share this post',
      url: postUrl,
    }
    try {
      await navigator.share(shareData)
    } catch (error) {
      console.error(error)
      // Throw toast Error
    }
  }

  return (
    <DropdownMenu>
      <div className='absolute top-0'>
        <DropdownMenuTrigger
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
          }}
          render={(props) => (
            <IconButton
              {...props}
              size={size}
              icon={ShareIcon}
              className='data-[popup-open]:text-primary'
            />
          )}
        />
      </div>
      <DropdownMenuContent alignOffset={0} sideOffset={8} align='end'>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
            handleCopyLink()
          }}
        >
          <CopyIcon />
          Copy Link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
            handleSharePost()
          }}
        >
          <ShareIcon />
          Share post via...
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
