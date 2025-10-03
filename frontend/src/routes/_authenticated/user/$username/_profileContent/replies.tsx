import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/user/$username/_profileContent/replies',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/_authenticated/user/$username/_profileContent/replies"!</div>
  )
}
