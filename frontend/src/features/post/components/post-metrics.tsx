import IconButton from '@/components/icon-button'
import { MessageCircleIcon, RepeatIcon, ShareIcon } from 'lucide-react'
import LikeButton from './like-button'

type PostMetricsProps = {
  postId: number
  replyCount: number
  repostCount: number
  likeCount: number
  isLiked: boolean
  isDetail?: boolean
}

export function PostMetrics({
  postId,
  replyCount,
  repostCount,
  likeCount,
  isLiked,
  isDetail = false,
}: PostMetricsProps) {
  return (
    <div className='flex justify-between'>
      <IconButton
        size={isDetail ? 'md' : 'sm'}
        icon={MessageCircleIcon}
        count={replyCount}
      />
      <IconButton
        size={isDetail ? 'md' : 'sm'}
        icon={RepeatIcon}
        count={repostCount}
      />
      <LikeButton
        postId={postId}
        count={likeCount}
        isLiked={isLiked}
        size={isDetail ? 'md' : 'sm'}
      />

      {/* Share button */}
      <IconButton size={isDetail ? 'md' : 'sm'} icon={ShareIcon} />
    </div>
  )
}
