import CreatePost from '@/features/post/components/create-post'
import PostList from '@/features/post/components/post-list'
import { feedPostsInfiniteQueryOptions } from '@/features/post/queries'
import { createFileRoute } from '@tanstack/react-router'
import { LoaderIcon } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.prefetchInfiniteQuery(feedPostsInfiniteQueryOptions)
  },
  pendingComponent: () => (
    <div className='mt-32 flex items-center justify-center'>
      <LoaderIcon className='text-primary size-6 animate-spin' />
    </div>
  ),
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
