import FeedTabs from '@/components/feed-tabs'
import CreatePostForm from '@/features/post/components/create-post-form'
import FeedList from '@/features/post/components/feed-list'
import {
  feedPostsQueryOptions,
  followingFeedPostsQueryOptions,
} from '@/features/post/queries'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/')({
  loader: async ({ context: { queryClient } }) => {
    queryClient.prefetchInfiniteQuery(feedPostsQueryOptions)
    queryClient.prefetchInfiniteQuery(followingFeedPostsQueryOptions)
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <FeedTabs />
      <CreatePostForm />
      <FeedList />
    </div>
  )
}
