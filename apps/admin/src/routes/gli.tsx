import { createFileRoute } from '@tanstack/react-router';
import { GliPage } from '@pages/Gli';

export const Route = createFileRoute('/gli')({
  component: GliPage,
});
