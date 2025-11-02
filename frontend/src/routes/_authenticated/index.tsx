import FeedTabs from '@/components/feed-tabs'
import CreatePost from '@/features/post/components/create-post'
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
      <CreatePost />
      <FeedList />
    </div>
  )
}
