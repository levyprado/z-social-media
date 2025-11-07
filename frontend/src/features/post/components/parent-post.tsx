import Avatar from '@/components/ui/avatar'
import { formatPostDate } from '@/lib/utils'
import type { Post } from '@/shared/types'

type ParentPostProps = {
  onClick: (e: React.MouseEvent) => void
  post: Post
}

export default function ParentPost({ onClick, post }: ParentPostProps) {
  return (
    <div
      onClick={onClick}
      className='hover:bg-background mt-1 flex min-w-0 flex-col gap-1 rounded-md border p-3'
    >
      <div className='flex items-center text-sm'>
        <Avatar img={post.user.image} className='mr-1 size-6' />
        <span className='mr-1 truncate font-semibold leading-tight'>
          {post.user.name}
        </span>
        <div className='text-muted-foreground flex min-w-0 gap-1'>
          <span className='truncate leading-tight'>@{post.user.username}</span>
          <span>·</span>
          <span className='whitespace-nowrap leading-tight'>
            {formatPostDate(post.createdAt)}
          </span>
        </div>
      </div>
      <p className='whitespace-pre-wrap break-words text-sm'>{post.content}</p>
    </div>
  )
}
