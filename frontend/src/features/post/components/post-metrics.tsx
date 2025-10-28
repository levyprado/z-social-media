import IconButton from '@/components/icon-button'
import type { Post } from '@/shared/types'
import { RepeatIcon, ShareIcon } from 'lucide-react'
import LikeButton from './like-button'
import ReplyButton from './reply-button'

type PostMetricsProps = {
  post: Post & { parentPost?: Post | null }
  replyCount: number
  repostCount: number
  likeCount: number
  isLiked: boolean
  isDetail?: boolean
}

export function PostMetrics({
  post,
  replyCount,
  repostCount,
  likeCount,
  isLiked,
  isDetail = false,
}: PostMetricsProps) {
  return (
    <div className='flex justify-between'>
      <ReplyButton
        post={post}
        count={replyCount}
        size={isDetail ? 'md' : 'sm'}
      />
      <IconButton
        size={isDetail ? 'md' : 'sm'}
        icon={RepeatIcon}
        count={repostCount}
      />
      <LikeButton
        postId={post.id}
        count={likeCount}
        isLiked={isLiked}
        size={isDetail ? 'md' : 'sm'}
      />

      {/* Share button */}
      <IconButton size={isDetail ? 'md' : 'sm'} icon={ShareIcon} />
    </div>
  )
}
