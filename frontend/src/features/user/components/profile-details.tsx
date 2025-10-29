import Avatar from '@/components/ui/avatar'
import { formatMonthYear } from '@/lib/utils'
import { useParams, useRouteContext } from '@tanstack/react-router'
import { CalendarDaysIcon, ExternalLinkIcon } from 'lucide-react'
import { useUserByUsername } from '../queries'
import EditProfileDialog from './edit-profile-dialog'
import FollowButton from './follow-button'
import FollowStats from './follow-stats'
import ProfileBanner from './profile-banner'

export default function ProfileDetails() {
  const { username } = useParams({ from: '/_authenticated/user/$username' })
  const { user: authUser } = useRouteContext({ from: '/_authenticated' })
  const { data: profileUser } = useUserByUsername(username)
  const isOwnProfile = authUser.id === profileUser.id

  return (
    <div>
      <ProfileBanner />

      <div className='px-4 py-3'>
        {/* Avatar and Action Button row */}
        <div className='flex items-start justify-between'>
          <Avatar
            img={profileUser.image}
            className='outline-background -mt-[calc(12.5%+12px)] h-auto w-[25%] min-w-12 outline-4'
          />

          <div>
            {isOwnProfile ? (
              <EditProfileDialog />
            ) : (
              <FollowButton
                userId={profileUser.id}
                isFollowed={profileUser.isFollowed}
              />
            )}
          </div>
        </div>

        {/* User name/username & Bio */}
        <div className='mt-2 flex flex-col'>
          <span className='text-xl font-bold leading-tight'>
            {profileUser.name}
          </span>
          <span className='text-muted-foreground leading-tight'>
            @{profileUser.username}
          </span>
          {profileUser.bio && (
            <p className='mt-2 whitespace-pre-wrap'>{profileUser.bio}</p>
          )}
          {profileUser.website && (
            <a
              href={profileUser.website}
              className='text-primary mt-2 flex w-fit items-center gap-1.5 text-sm hover:underline'
              target='_blank'
              rel='noopener noreferrer'
            >
              {profileUser.website}
              <ExternalLinkIcon className='size-3' />
            </a>
          )}
        </div>

        {/* User metadata */}
        <div className='text-muted-foreground flex flex-col py-4'>
          <div className='flex items-center gap-2'>
            <CalendarDaysIcon className='size-4' />
            <span className='text-sm'>
              Joined {formatMonthYear(profileUser.createdAt)}
            </span>
          </div>
        </div>

        {/* Followers/Following */}
        <FollowStats />
      </div>
    </div>
  )
}
