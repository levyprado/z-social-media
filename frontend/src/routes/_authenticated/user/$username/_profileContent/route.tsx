import PageHeader from '@/components/page-header'
import ProfileDetails from '@/features/user/components/profile-details'
import ProfileTabs from '@/features/user/components/profile-tabs'
import { userByUsernameQueryOptions } from '@/features/user/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/user/$username/_profileContent',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { username } = Route.useParams()
  const { data: user } = useSuspenseQuery(userByUsernameQueryOptions(username))

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
