import { createFileRoute } from '@tanstack/react-router'
import MartianAliens from '@pages/MartianAliens'

export const Route = createFileRoute('/aliens-martiens')({
  component: MartianAliens,
})