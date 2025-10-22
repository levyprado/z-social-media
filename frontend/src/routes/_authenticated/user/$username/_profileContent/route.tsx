import PageHeader from '@/components/page-header'
import ProfileContentSkeleton from '@/features/user/components/profile-content-skeleton'
import ProfileDetails from '@/features/user/components/profile-details'
import ProfileTabs from '@/features/user/components/profile-tabs'
import { useUserByUsername } from '@/features/user/queries'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/user/$username/_profileContent',
)({
  component: RouteComponent,
  pendingComponent: ProfileContentSkeleton,
})

function RouteComponent() {
  const { username } = Route.useParams()
  const { data: user } = useUserByUsername(username)

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
