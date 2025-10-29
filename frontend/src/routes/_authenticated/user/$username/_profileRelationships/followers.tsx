import UserList from '@/features/user/components/user-list'
import UserListSkeleton from '@/features/user/components/user-list-skeleton'
import { useUserByUsername, useUserFollowers } from '@/features/user/queries'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/user/$username/_profileRelationships/followers',
)({
  component: RouteComponent,
  pendingComponent: UserListSkeleton,
})

function RouteComponent() {
  const { username } = Route.useParams()
  const { data: user } = useUserByUsername(username)
  const { data: followers } = useUserFollowers(user.id)

  return (
    <>
      <UserList users={followers} />
    </>
  )
}
