import IconButton from '@/components/icon-button'
import {
  HeartIcon,
  MessageCircleIcon,
  RepeatIcon,
  ShareIcon,
} from 'lucide-react'

type PostMetricsProps = {
  replyCount: number
  repostCount: number
  likeCount: number
  isDetail?: boolean
}

export function PostMetrics({
  replyCount,
  repostCount,
  likeCount,
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
      <IconButton
        size={isDetail ? 'md' : 'sm'}
        icon={HeartIcon}
        count={likeCount}
      />

      {/* Share button */}
      <IconButton size={isDetail ? 'md' : 'sm'} icon={ShareIcon} />
    </div>
  )
}
