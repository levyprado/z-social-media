import PageHeader from '@/components/page-header'
import { userByUsernameQueryOptions } from '@/features/user/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Outlet, useParams } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/user/$username/_profileRelationships',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { username } = useParams({ from: '/_authenticated/user/$username' })
  const { data: user } = useSuspenseQuery(userByUsernameQueryOptions(username))

  return (
    <>
      <PageHeader title={user.name} description={`@${user.username}`} />
      <Outlet />
    </>
  )
}
