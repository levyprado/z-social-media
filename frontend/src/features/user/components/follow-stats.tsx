import { Link } from '@tanstack/react-router'

export default function FollowStats() {
  return (
    <div className='flex items-center gap-4'>
      <Link
        to='/user/$username/following'
        params={{
          username: 'elonmusk',
        }}
        className='flex items-center gap-1 text-sm hover:underline'
      >
        <span className='font-bold'>77</span>
        <span className='text-muted-foreground'>Following</span>
      </Link>
      <Link
        to='/user/$username/followers'
        params={{
          username: 'elonmusk',
        }}
        className='flex items-center gap-1 text-sm hover:underline'
      >
        <span className='font-bold'>12</span>
        <span className='text-muted-foreground'>Followers</span>
      </Link>
    </div>
  )
}
