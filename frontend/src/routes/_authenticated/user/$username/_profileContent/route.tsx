import ProfileDetails from '@/components/profile/profile-details'
import ProfileHeader from '@/components/profile/profile-header'
import ProfileTabs from '@/components/profile/profile-tabs'
import { createFileRoute, Outlet, useLoaderData } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/user/$username/_profileContent',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useLoaderData({ from: '/_authenticated/user/$username' })

  return (
    <>
      <ProfileHeader title={user.name} />

      <ProfileDetails />

      <ProfileTabs />

      <section className='min-h-[150vh]'>
        <Outlet />
      </section>
    </>
  )
}
