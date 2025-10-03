import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/user/$username/_profileRelationships/following',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Following.tsx</div>
}
