import ProfileHeader from '@/components/profile/profile-header'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/user/$username/_profileRelationships',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <ProfileHeader title='Elon Musk' description='@elonmusk' />
      <Outlet />
    </>
  )
}
