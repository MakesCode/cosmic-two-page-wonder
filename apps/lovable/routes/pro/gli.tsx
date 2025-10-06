import { createFileRoute } from '@tanstack/react-router';
import { GliPage } from '@pages/Gli';

export const Route = createFileRoute('/pro/gli')({
  component: GliPage,
});

