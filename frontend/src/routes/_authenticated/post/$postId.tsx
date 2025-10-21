import PageHeader from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import PostDetail from '@/features/post/components/post-detail'
import {
  postDetailQueryOptions,
  postRepliesQueryOptions,
} from '@/features/post/queries'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/post/$postId')({
  loader: async ({ params, context: { queryClient } }) => {
    const { postId } = params

    const res = await queryClient.ensureQueryData(
      postDetailQueryOptions(postId),
    )
    if (!res.success) throw notFound()

    queryClient.prefetchInfiniteQuery(postRepliesQueryOptions(postId))

    return res.data
  },
  component: RouteComponent,
  pendingComponent: PendingComponent,
  notFoundComponent: NotFoundComponent,
})

function RouteComponent() {
  return (
    <div className='min-h-[150vh]'>
      <PageHeader title='Post' />

      <PostDetail />
    </div>
  )
}

function PendingComponent() {
  return (
    <div>
      <PageHeader title='Post' />

      <div className='mt-16 flex items-center justify-center'>
        <Spinner />
      </div>
    </div>
  )
}

function NotFoundComponent() {
  return (
    <>
      <PageHeader title='Post' />

      <div className='mt-20 flex flex-col items-center justify-center gap-5 px-4'>
        <h1 className='text-center text-3xl font-semibold'>Post not found</h1>
        <Button
          variant='secondary'
          className='size-fit'
          render={(props) => (
            <Link to='/' {...props}>
              Go back
            </Link>
          )}
        ></Button>
      </div>
    </>
  )
}
