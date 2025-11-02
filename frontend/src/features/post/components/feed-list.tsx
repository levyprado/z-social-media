import { useFeedTab } from '../hooks/use-feed-tab'
import { useFeedPosts, useFollowingFeedPosts } from '../queries'
import PostList from './post-list'

export default function FeedList() {
  const { tab } = useFeedTab()

  const allFeedQuery = useFeedPosts()
  const followingFeedQuery = useFollowingFeedPosts()

  const activeQuery = tab === 'all' ? allFeedQuery : followingFeedQuery

  return <PostList query={activeQuery} />
}
