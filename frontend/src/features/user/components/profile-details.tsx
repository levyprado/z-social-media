import Avatar from '@/components/ui/avatar'
import { formatMonthYear } from '@/lib/utils'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { CalendarDaysIcon } from 'lucide-react'
import { userByUsernameQueryOptions } from '../queries'
import EditProfileDialog from './edit-profile-dialog'
import FollowStats from './follow-stats'

export default function ProfileDetails() {
  const { username } = useParams({ from: '/_authenticated/user/$username' })
  const { data: user } = useSuspenseQuery(userByUsernameQueryOptions(username))

  return (
    <div>
      {/* User banner */}
      <div className='aspect-[3/1] w-full'>
        {/* Placeholder banner */}
        <div className='bg-accent size-full object-cover'></div>
      </div>

      <div className='px-4 py-3'>
        {/* Avatar and Action Button row */}
        <div className='flex items-start justify-between'>
          <Avatar
            img={user.image}
            className='outline-background -mt-[calc(12.5%+12px)] h-auto w-[25%] min-w-12 outline-4'
          />

          <div>
            <EditProfileDialog />
          </div>
        </div>

        {/* User name/username & Bio */}
        <div className='mt-2 flex flex-col'>
          <span className='text-xl font-bold leading-tight'>{user.name}</span>
          <span className='text-muted-foreground leading-tight'>
            @{user.username}
          </span>
          <p className='mt-2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            aliquam lacus vitae arcu mattis, eu iaculis felis cursus.
            Suspendisse ut tortor eget l
          </p>
        </div>

        {/* User metadata */}
        <div className='text-muted-foreground flex flex-col py-4'>
          <div className='flex items-center gap-2'>
            <CalendarDaysIcon className='size-4' />
            <span className='text-sm'>
              Joined {formatMonthYear(user.createdAt)}
            </span>
          </div>
        </div>

        {/* Followers/Following */}
        <FollowStats />
      </div>
    </div>
  )
}
