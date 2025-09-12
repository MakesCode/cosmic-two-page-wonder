import { StatusOption, StatusInfo } from '../types';

export const STATUS_OPTIONS: StatusOption[] = [
  { label: 'Tous', value: undefined },
  { label: 'En attente', value: 1 },
  { label: 'Validé', value: 2 },
  { label: 'Refusé', value: 3 },
  { label: 'En cours', value: 4 },
];

export const getStatusInfo = (status: number): StatusInfo => {
  switch (status) {
    case 1:
      return { text: 'En attente', variant: 'secondary' };
    case 2:
      return { text: 'Validé', variant: 'default' };
    case 3:
      return { text: 'Refusé', variant: 'destructive' };
    case 4:
      return { text: 'En cours', variant: 'outline' };
    default:
      return { text: 'Inconnu', variant: 'secondary' };
  }
};
