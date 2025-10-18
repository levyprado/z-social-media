import PostList from '@/features/post/components/post-list'
import { useUserPosts } from '@/features/post/queries'
import { userByUsernameQueryOptions } from '@/features/user/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/user/$username/_profileContent/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { username } = Route.useParams()
  const { data: user } = useSuspenseQuery(userByUsernameQueryOptions(username))

  const query = useUserPosts(user.id)

  return (
    <>
      <PostList query={query} />
    </>
  )
}
