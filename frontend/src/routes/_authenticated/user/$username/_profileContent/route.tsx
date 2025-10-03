import ProfileDetails from '@/components/profile/profile-details'
import ProfileHeader from '@/components/profile/profile-header'
import ProfileTabs from '@/components/profile/profile-tabs'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/user/$username/_profileContent',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <ProfileHeader title='Elon Musk' description='5 posts' />

      <ProfileDetails />

      <ProfileTabs />

      <section className='min-h-[150vh]'>
        <Outlet />
      </section>
    </>
  )
}
