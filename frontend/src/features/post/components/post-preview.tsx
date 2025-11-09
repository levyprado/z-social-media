import Avatar from '@/components/ui/avatar'
import { formatPostDate } from '@/lib/utils'
import type { Post } from '@/shared/types'
import { Link } from '@tanstack/react-router'
import ParentPost from './parent-post'

type PostPreviewProps = {
  post: Post & { parentPost?: Post | null }
}

export default function PostPreview({ post }: PostPreviewProps) {
  return (
    <div className='mt-4 flex gap-3 overflow-hidden px-3'>
      <div className='flex flex-col items-center'>
        <Link
          to='/user/$username'
          params={{ username: post.user.username }}
          className='transition-[filter] hover:brightness-[.85]'
        >
          <Avatar img={post.user.image} />
        </Link>

        <div className='bg-muted -mb-5 mt-1.5 w-0.5 grow rounded-full' />
      </div>

      <div className='flex w-full min-w-0 flex-col gap-1'>
        <div className='flex flex-col gap-1'>
          <div className='flex min-w-0 flex-col sm:flex-row'>
            <div className='truncate text-sm font-semibold leading-tight sm:mr-1'>
              {post.user.name}
            </div>
            <div className='text-muted-foreground flex items-baseline gap-1 text-sm'>
              <div className='truncate leading-tight'>
                @{post.user.username}
              </div>
              <span>·</span>
              <span className='whitespace-nowrap leading-tight'>
                {formatPostDate(post.createdAt)}
              </span>
            </div>
          </div>

          <div className='whitespace-pre-wrap break-words text-sm'>
            {post.content}
          </div>

          {post.parentPost && (
            <ParentPost onClick={() => {}} post={post.parentPost} />
          )}
        </div>
      </div>
    </div>
  )
}
