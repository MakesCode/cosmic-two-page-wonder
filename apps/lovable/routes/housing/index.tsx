import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/housing/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/housing/"!</div>
}
