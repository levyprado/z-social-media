import CreatePost from '@/features/post/components/create-post'
import PostList from '@/features/post/components/post-list'
import { feedPostsQueryOptions, useFeedPosts } from '@/features/post/queries'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/')({
  loader: async ({ context: { queryClient } }) => {
    queryClient.prefetchInfiniteQuery(feedPostsQueryOptions)
  },
  component: RouteComponent,
})

function RouteComponent() {
  const query = useFeedPosts()

  return (
    <div>
      <CreatePost />
      <PostList query={query} />
    </div>
  )
}
