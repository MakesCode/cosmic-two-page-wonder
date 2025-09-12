import { createFileRoute } from '@tanstack/react-router'
import Mars from '@pages/Mars'

export const Route = createFileRoute('/mars')({
  component: Mars,
})