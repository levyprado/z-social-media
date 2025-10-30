import UserList from '@/features/user/components/user-list'
import UserListSkeleton from '@/features/user/components/user-list-skeleton'
import { useUserByUsername, useUserFollowing } from '@/features/user/queries'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/user/$username/_profileRelationships/following',
)({
  component: RouteComponent,
  pendingComponent: UserListSkeleton,
})

function RouteComponent() {
  const { username } = Route.useParams()
  const { data: user } = useUserByUsername(username)
  const query = useUserFollowing(user.id)

  return (
    <>
      <UserList query={query} />
    </>
  )
}
