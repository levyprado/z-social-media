import CreatePost from '@/features/post/components/create-post'
import PostList from '@/features/post/components/post-list'
import { getFeedPosts } from '@/features/post/queries'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/')({
  loader: async () => {
    const posts = await getFeedPosts()

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
