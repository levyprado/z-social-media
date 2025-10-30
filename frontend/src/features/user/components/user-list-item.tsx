import Avatar from '@/components/ui/avatar'
import type { UserProfile } from '@/shared/types'
import { Link } from '@tanstack/react-router'
import FollowButton from './follow-button'

type UserListItemProps = {
  user: UserProfile
}

export default function UserListItem({ user }: UserListItemProps) {
  return (
    <li>
      <Link
        to='/user/$username'
        params={{ username: user.username }}
        className='hover:bg-card flex items-center gap-2 px-3 py-2'
      >
        <Avatar img={user.image} />

        <div className='flex w-full min-w-0 items-center justify-between'>
          <div className='flex min-w-0 flex-col text-sm sm:text-base'>
            <span className='truncate font-semibold leading-tight hover:underline'>
              {user.name}
            </span>
            <span className='text-muted-foreground truncate leading-tight hover:underline'>
              @{user.username}
            </span>
          </div>

          <FollowButton userId={user.id} isFollowed={user.isFollowed} />
        </div>
      </Link>
    </li>
  )
}
