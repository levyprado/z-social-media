import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/user/$username/_profileRelationships/followers',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Followers.tsx</div>
}
