import CreatePost from '@/features/post/components/create-post'
import PostList from '@/features/post/components/post-list'
import {
  feedPostsInfiniteQueryOptions,
  useFeedPosts,
} from '@/features/post/queries'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/')({
  loader: async ({ context: { queryClient } }) => {
    queryClient.prefetchInfiniteQuery(feedPostsInfiniteQueryOptions)
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
