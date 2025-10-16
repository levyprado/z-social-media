import PostList from '@/features/post/components/post-list'
import { useUserPosts } from '@/features/post/queries'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/user/$username/_profileContent/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useLoaderData({ from: '/_authenticated/user/$username' })

  const query = useUserPosts(user.id)

  return (
    <>
      <PostList query={query} />
    </>
  )
}
