import { AstroEvent } from './index';

// Mock venue data for display purposes
export const venues = {
  'coorg': { name: 'Coorg Hills', location: 'Karnataka' },
  'wayanad': { name: 'Wayanad Peaks', location: 'Kerala' },
  'kodaikanal': { name: 'Kodaikanal Observatory', location: 'Tamil Nadu' },
  'munnar': { name: 'Munnar Heights', location: 'Kerala' },
  'ooty': { name: 'Ooty Meadows', location: 'Tamil Nadu' },
};

// Mock data for 5 sample events as specified in the prompt
export const mockEvents: AstroEvent[] = [
  {
    id: 'coorg-jan-14',
    date: '2025-01-14T20:00:00Z',
    venueId: 'coorg',
    moonIllumination: 0.15, // DSO Prime - < 20%
    suitability: 'DSO Prime',
    pledgeCount: 6, // Greenlit at 6 pledges
    status: 'Greenlit',
    isAvailable: true,
  },
  {
    id: 'wayanad-jan-15',
    date: '2025-01-15T19:30:00Z',
    venueId: 'wayanad',
    moonIllumination: 0.18, // DSO Prime
    suitability: 'DSO Prime',
    pledgeCount: 4,
    status: 'Blocked', // Blocked by facilitator buffer
    isAvailable: false,
  },
  {
    id: 'kodaikanal-nov-2',
    date: '2024-11-02T20:30:00Z',
    venueId: 'kodaikanal',
    moonIllumination: 0.35, // Mixed Viewing - 20-50%
    suitability: 'Mixed Viewing',
    pledgeCount: 3,
    status: 'Pending',
    isAvailable: true,
  },
  {
    id: 'munnar-nov-12',
    date: '2024-11-12T19:45:00Z',
    venueId: 'munnar',
    moonIllumination: 0.42, // Mixed Viewing
    suitability: 'Mixed Viewing',
    pledgeCount: 2,
    status: 'Pending',
    isAvailable: true,
  },
  {
    id: 'ooty-new-moon',
    date: '2024-12-01T20:15:00Z',
    venueId: 'ooty',
    moonIllumination: 0.02, // DSO Prime - New Moon window
    suitability: 'DSO Prime',
    pledgeCount: 1,
    status: 'Momentum', // Emerging
    isAvailable: true,
  },
];
