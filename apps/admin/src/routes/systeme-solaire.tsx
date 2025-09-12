import { createFileRoute } from '@tanstack/react-router'
import SolarSystem from "@pages/SolarSystem"

export const Route = createFileRoute('/systeme-solaire')({
  component: () => <SolarSystem />,
})

