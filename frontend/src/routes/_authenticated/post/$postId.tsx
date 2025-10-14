import PageHeader from '@/components/page-header'
import PostDetail from '@/features/post/components/post-detail'
import {
  postQueryOptions,
  repliesInfiniteQueryOptions,
} from '@/features/post/queries'
import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/post/$postId')({
  loader: async ({ params, context: { queryClient } }) => {
    const { postId } = params

    const res = await queryClient.ensureQueryData(postQueryOptions(postId))
    if (!res.success) throw notFound()

    queryClient.prefetchInfiniteQuery(repliesInfiniteQueryOptions(postId))

    return res.data
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='min-h-[150vh]'>
      <PageHeader title='Post' />

      <PostDetail />
    </div>
  )
}
