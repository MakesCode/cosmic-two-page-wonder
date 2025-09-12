import { Subscription } from '../types';

export const mockSubscriptions: Subscription[] = [
  {
    id: 'sub-001',
    name: 'Subscription Premium',
    status: 'active',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'sub-002',
    name: 'Subscription Standard',
    status: 'inactive',
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2024-06-01'),
  },
];

export const getDefaultSubscription = (): Subscription => mockSubscriptions[0];
