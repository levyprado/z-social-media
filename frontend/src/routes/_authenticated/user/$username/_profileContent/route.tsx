import PageHeader from '@/components/page-header'
import ProfileDetails from '@/features/user/components/profile-details'
import ProfileTabs from '@/features/user/components/profile-tabs'
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
      <PageHeader title={user.name} />

      <ProfileDetails />

      <ProfileTabs />

      <section>
        <Outlet />
      </section>
    </>
  )
}
