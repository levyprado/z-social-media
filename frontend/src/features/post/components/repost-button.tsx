import IconButton from '@/components/icon-button'
import { RepeatIcon } from 'lucide-react'
import { toast } from 'sonner'

type RepostButtonProps = {
  size: 'md' | 'sm'
  count: number
}

export default function RepostButton({ size, count }: RepostButtonProps) {
  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toast.info('Repost feature in progress')
  }

  return (
    <IconButton
      onClick={handleOnClick}
      size={size}
      icon={RepeatIcon}
      count={count}
    />
  )
}
