import { Link, useParams } from '@tanstack/react-router'
import { useUserByUsername } from '../queries'

export default function FollowStats() {
  const { username } = useParams({ from: '/_authenticated/user/$username' })
  const { data: user } = useUserByUsername(username)

  return (
    <div className='flex items-center gap-4'>
      <Link
        to='/user/$username/following'
        params={{ username }}
        className='flex items-center gap-1 text-sm hover:underline'
      >
        <span className='font-bold'>{user.followerCount}</span>
        <span className='text-muted-foreground'>Followers</span>
      </Link>
      <Link
        to='/user/$username/followers'
        params={{ username }}
        className='flex items-center gap-1 text-sm hover:underline'
      >
        <span className='font-bold'>{user.followingCount}</span>
        <span className='text-muted-foreground'>Following</span>
      </Link>
    </div>
  )
}
