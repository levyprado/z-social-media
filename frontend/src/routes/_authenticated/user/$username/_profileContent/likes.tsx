import PostList from '@/features/post/components/post-list'
import { useUserLikedPosts } from '@/features/post/queries'
import { useUserByUsername } from '@/features/user/queries'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/user/$username/_profileContent/likes',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { username } = Route.useParams()
  const { data: user } = useUserByUsername(username)

  const query = useUserLikedPosts(user.id)

  return (
    <>
      <PostList query={query} />
    </>
  )
}
