import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => <div>Bienvenue sur l’admin (SSR)</div>,
})

