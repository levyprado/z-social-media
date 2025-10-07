import IconButton from '@/components/icon-button'
import Avatar from '@/components/ui/avatar'
import { PostMetrics } from '@/features/post/components/post-metrics'
import type { Post } from '@/shared/types'
import { EllipsisIcon } from 'lucide-react'

type PostProps = {
  post: Post
}

export default function Post({ post }: PostProps) {
  return (
    <article className='flex gap-2 py-3 pl-3 pr-4'>
      <div>
        <Avatar img={post.user.image} />
      </div>

      <div className='flex w-full min-w-0 flex-col gap-1'>
        <div className='flex items-start justify-between gap-2'>
          {/* User data */}
          <div className='flex min-w-0 flex-col'>
            <span className='truncate text-sm font-semibold leading-tight'>
              {post.user.name}
            </span>
            <div className='text-muted-foreground flex items-baseline gap-1 text-sm'>
              <span className='truncate leading-tight'>
                @{post.user.username}
              </span>
              <span>·</span>
              <span className='leading-tight'>20h</span>
            </div>
          </div>

          {/* Actions button */}
          <IconButton icon={EllipsisIcon} />
        </div>

        {/* Post content */}
        <div className='whitespace-pre-wrap text-sm'>{post.content}</div>

        {/* Replying to */}

        {/* Post metrics */}
        <PostMetrics />
      </div>
    </article>
  )
}
