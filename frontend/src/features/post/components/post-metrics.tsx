import IconButton from '@/components/icon-button'
import { cn } from '@/lib/utils'
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
  isLiked: boolean
  isDetail?: boolean
}

export function PostMetrics({
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
      <IconButton
        size={isDetail ? 'md' : 'sm'}
        icon={HeartIcon}
        count={likeCount}
        className={cn(isLiked && 'text-primary')}
      />

      {/* Share button */}
      <IconButton size={isDetail ? 'md' : 'sm'} icon={ShareIcon} />
    </div>
  )
}
