'use client';

import { useState } from 'react';
import { AstroEvent } from '@/lib';
import { venues } from '@/lib/mockData';
import { EventCard } from './EventCard';

interface WeatherGridProps {
  events: AstroEvent[];
}

export function WeatherGrid({ events }: WeatherGridProps) {
  const [selectedVenue, setSelectedVenue] = useState<string>('all');

  // Get unique venues from events
  const availableVenues = Array.from(new Set(events.map(event => event.venueId)));
  
  // Filter events based on selected venue
  const filteredEvents = selectedVenue === 'all' 
    ? events 
    : events.filter(event => event.venueId === selectedVenue);

  // Sort events by date
  const sortedEvents = [...filteredEvents].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="mb-8">
        <h2 className="font-sans text-xl font-semibold text-charcoal mb-4">
          Filter by Location
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedVenue('all')}
            className={`px-4 py-2 rounded-lg font-sans text-sm font-medium transition-colors ${
              selectedVenue === 'all'
                ? 'bg-echo-teal text-white'
                : 'bg-white text-charcoal border border-gray-200 hover:bg-gray-50'
            }`}
          >
            All Sites
          </button>
          {availableVenues.map(venueId => {
            const venue = venues[venueId as keyof typeof venues];
            return (
              <button
                key={venueId}
                onClick={() => setSelectedVenue(venueId)}
                className={`px-4 py-2 rounded-lg font-sans text-sm font-medium transition-colors ${
                  selectedVenue === venueId
                    ? 'bg-echo-teal text-white'
                    : 'bg-white text-charcoal border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {venue.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Empty State */}
      {sortedEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="font-serif text-charcoal/70">
            No events found for the selected filters.
          </p>
        </div>
      )}
    </div>
  );
}
