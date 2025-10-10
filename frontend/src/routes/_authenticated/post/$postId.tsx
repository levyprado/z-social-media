import PageHeader from '@/components/page-header'
import PostDetail from '@/features/post/components/post-detail'
import { getPost } from '@/features/post/queries'
import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/post/$postId')({
  loader: async ({ params }) => {
    const { postId } = params

    const res = await getPost(postId)
    if (!res.success) throw notFound()

    return { post: res.data }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <PageHeader title='Post' />

      <PostDetail />
    </div>
  )
}
