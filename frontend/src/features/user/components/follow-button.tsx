import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'
import { useToggleFollow } from '../mutations'

type FollowButtonProps = {
  userId: string
  isFollowed: boolean
}

export default function FollowButton({
  userId,
  isFollowed,
}: FollowButtonProps) {
  const mutation = useToggleFollow(userId)

  return (
    <Button
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
      variant={isFollowed ? 'secondary' : 'default'}
    >
      {mutation.isPending ? (
        <Loader2Icon className='animate-spin' />
      ) : (
        <>{isFollowed ? 'Unfollow' : 'Follow'}</>
      )}
    </Button>
  )
}
