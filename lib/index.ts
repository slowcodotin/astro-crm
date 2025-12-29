export type Suitability = 'DSO Prime' | 'Mixed Viewing' | 'LO Prime';
export type QuorumStatus = 'Pending' | 'Momentum' | 'Greenlit' | 'Blocked';

export interface FacilitatorBlock {
  start: string; // ISO Date
  end: string;   // ISO Date
  reason: string;
}

export interface VenueBlock {
  venueId: string;
  start: string; // ISO Date
  end: string;   // ISO Date
  reason: string;
}

export interface AstroEvent {
  id: string;
  date: string; 
  venueId: string;
  moonIllumination: number; 
  suitability: Suitability;
  pledgeCount: number;
  status: QuorumStatus;
  isAvailable: boolean; 
}

