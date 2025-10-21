import PageHeader from '@/components/page-header'
import { useUserByUsername } from '@/features/user/queries'
import { createFileRoute, Outlet, useParams } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/user/$username/_profileRelationships',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { username } = useParams({ from: '/_authenticated/user/$username' })
  const { data: user } = useUserByUsername(username)

  return (
    <>
      <PageHeader title={user.name} description={`@${user.username}`} />
      <Outlet />
    </>
  )
}
