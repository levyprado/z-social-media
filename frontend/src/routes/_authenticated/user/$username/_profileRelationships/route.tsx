import PageHeader from '@/components/page-header'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/user/$username/_profileRelationships',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <PageHeader title='Elon Musk' description='@elonmusk' />
      <Outlet />
    </>
  )
}
