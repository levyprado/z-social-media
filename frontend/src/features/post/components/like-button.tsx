import IconButton from '@/components/icon-button'
import { cn } from '@/lib/utils'
import { HeartIcon } from 'lucide-react'
import { useToggleLike } from '../mutations'

type LikeButtonProps = {
  postId: number
  count: number
  isLiked: boolean
  size: 'sm' | 'md'
}

export default function LikeButton({
  postId,
  count,
  isLiked,
  size,
}: LikeButtonProps) {
  const mutation = useToggleLike(postId)

  return (
    <IconButton
      onClick={(e) => {
        e.stopPropagation()
        mutation.mutate()
      }}
      disabled={mutation.isPending}
      size={size}
      icon={HeartIcon}
      count={count}
      className={cn(isLiked && 'text-primary')}
    />
  )
}
