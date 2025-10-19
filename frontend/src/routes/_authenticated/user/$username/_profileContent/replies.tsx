import PostList from '@/features/post/components/post-list'
import { useUserPostsWithReplies } from '@/features/post/queries'
import { userByUsernameQueryOptions } from '@/features/user/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/user/$username/_profileContent/replies',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { username } = Route.useParams()
  const { data: user } = useSuspenseQuery(userByUsernameQueryOptions(username))

  const query = useUserPostsWithReplies(user.id)

  return (
    <>
      <PostList query={query} />
    </>
  )
}
