import IconButton from '@/components/icon-button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { Post } from '@/shared/types'
import { MessageCircleIcon } from 'lucide-react'
import { useState } from 'react'
import CreatePostForm from './create-post-form'
import PostPreview from './post-preview'

type ReplyButtonProps = {
  post: Post & { parentPost?: Post | null }
  count: number
  size: 'sm' | 'md'
}

export default function ReplyButton({ post, count, size }: ReplyButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onClick={(e) => e.stopPropagation()}
        render={(props) => (
          <IconButton
            size={size}
            icon={MessageCircleIcon}
            count={count}
            {...props}
          />
        )}
      />
      <DialogContent
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <DialogHeader>
          <DialogTitle>
            Replying to{' '}
            <span className='text-primary'>@{post.user.username}</span>
          </DialogTitle>
        </DialogHeader>

        <PostPreview post={post} />
        <CreatePostForm
          parentPostId={post.id.toString()}
          onSuccess={() => {
            setOpen(false)
          }}
          onAvatarClick={() => {
            setOpen(false)
          }}
          className='border-none'
        />
      </DialogContent>
    </Dialog>
  )
}
