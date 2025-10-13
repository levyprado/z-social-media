import CreatePost from '@/features/post/components/create-post'
import PostList from '@/features/post/components/post-list'
import { feedPostsQueryOptions } from '@/features/post/queries'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/')({
  loader: async ({ context: { queryClient } }) => {
    const posts = await queryClient.ensureQueryData(feedPostsQueryOptions)

    return { posts }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <CreatePost />
      <PostList />
    </div>
  )
}
