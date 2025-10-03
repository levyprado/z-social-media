import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/user/$username/_profileContent/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <>index.tsx</>
}
