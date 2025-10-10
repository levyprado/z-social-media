import IconButton from '@/components/icon-button'
import Avatar from '@/components/ui/avatar'
import { PostMetrics } from '@/features/post/components/post-metrics'
import { formatPostDate } from '@/lib/utils'
import type { Post } from '@/shared/types'
import { Link, useNavigate } from '@tanstack/react-router'
import { EllipsisIcon } from 'lucide-react'

type PostProps = {
  post: Post
}

export default function Post({ post }: PostProps) {
  const navigate = useNavigate()

  const handlePostClick = () => {
    navigate({ to: '/post/$postId', params: { postId: post.id.toString() } })
  }

  return (
    <article
      onClick={handlePostClick}
      className='hover:bg-card flex cursor-pointer gap-2 py-3 pl-3 pr-4'
    >
      <div>
        <Link
          onClick={(e) => e.stopPropagation()}
          to='/user/$username'
          params={{ username: post.user.username }}
          className='transition-[filter] hover:brightness-[.85]'
        >
          <Avatar img={post.user.image} />
        </Link>
      </div>

      <div className='flex w-full min-w-0 flex-col gap-1'>
        <div className='flex items-start justify-between gap-2'>
          {/* User data */}
          <div className='flex min-w-0 flex-col sm:flex-row'>
            <Link
              onClick={(e) => e.stopPropagation()}
              to='/user/$username'
              params={{ username: post.user.username }}
              className='w-fit truncate text-sm font-semibold leading-tight hover:underline sm:mr-1'
            >
              {post.user.name}
            </Link>
            <div className='text-muted-foreground flex items-baseline gap-1 text-sm'>
              <Link
                onClick={(e) => e.stopPropagation()}
                to='/user/$username'
                params={{ username: post.user.username }}
                className='truncate leading-tight hover:underline'
              >
                @{post.user.username}
              </Link>
              <span>·</span>
              <span className='leading-tight'>
                {formatPostDate(post.createdAt)}
              </span>
            </div>
          </div>

          {/* Actions button */}
          <IconButton icon={EllipsisIcon} />
        </div>

        {/* Post content */}
        <div className='whitespace-pre-wrap text-sm'>{post.content}</div>

        {/* Replying to */}

        {/* Post metrics */}
        <div className='mt-2'>
          <PostMetrics replyCount={0} repostCount={0} likeCount={0} />
        </div>
      </div>
    </article>
  )
}
