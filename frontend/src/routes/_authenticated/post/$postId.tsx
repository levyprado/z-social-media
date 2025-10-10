import PageHeader from '@/components/page-header'
import PostDetail from '@/features/post/components/post-detail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/post/$postId')({
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
