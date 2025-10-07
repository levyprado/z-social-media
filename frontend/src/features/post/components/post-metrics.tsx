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
}

export function PostMetrics({
  replyCount,
  repostCount,
  likeCount,
}: PostMetricsProps) {
  const postMetricsItems = [
    {
      icon: MessageCircleIcon,
      count: replyCount,
    },
    {
      icon: RepeatIcon,
      count: repostCount,
    },
    {
      icon: HeartIcon,
      count: likeCount,
    },
  ]

  return (
    <div className='mt-2 flex justify-between'>
      {postMetricsItems.map((item, i) => (
        <PostMetricsButton key={i} item={item} />
      ))}

      {/* Share button */}
      <IconButton icon={ShareIcon} />
    </div>
  )
}

type PostMetricsButton = {
  item: {
    icon: React.ComponentType<{ size?: number; className?: string }>
    count: number
  }
}

export function PostMetricsButton({ item }: PostMetricsButton) {
  return <IconButton icon={item.icon} count={item.count} />
}
