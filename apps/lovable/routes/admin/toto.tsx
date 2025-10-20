import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/toto')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/toto"!</div>
}
