export type Suitability = 'DSO Prime' | 'Mixed Viewing' | 'LO Prime';
export type QuorumStatus = 'Pending' | 'Momentum' | 'Greenlit' | 'Blocked';

export interface AstroEvent {
  id: string;
  date: string; // ISO string
  venueId: string;
  moonIllumination: number; // 0 to 1
  suitability: Suitability;
  pledgeCount: number;
  status: QuorumStatus;
  isAvailable: boolean; // This is the "Sanitized" field for the frontend
}
