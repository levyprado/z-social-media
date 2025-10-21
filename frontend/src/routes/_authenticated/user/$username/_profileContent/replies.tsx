import PostList from '@/features/post/components/post-list'
import { useUserPostsWithReplies } from '@/features/post/queries'
import { useUserByUsername } from '@/features/user/queries'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/user/$username/_profileContent/replies',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { username } = Route.useParams()
  const { data: user } = useUserByUsername(username)

  const query = useUserPostsWithReplies(user.id)

  return (
    <>
      <PostList query={query} />
    </>
  )
}
