import IconButton from '@/components/icon-button'
import {
  HeartIcon,
  MessageCircleIcon,
  RepeatIcon,
  ShareIcon,
} from 'lucide-react'

export function PostMetrics() {
  const postMetricsItems = [
    {
      icon: MessageCircleIcon,
      count: 11,
    },
    {
      icon: RepeatIcon,
      count: 15,
    },
    {
      icon: HeartIcon,
      count: 364,
    },
  ]

  return (
    <div className='mt-2 flex justify-between'>
      {postMetricsItems.map((item) => (
        <PostMetricsButton key={item.count} item={item} />
      ))}

      {/* Share button */}
      <IconButton icon={ShareIcon} />
    </div>
  )
}

type PostMetricsButton = {
  item: any
}

export function PostMetricsButton({ item }: PostMetricsButton) {
  return <IconButton icon={item.icon} count={item.count} />
}
