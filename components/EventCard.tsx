'use client';

import { AstroEvent } from '@/lib';
import { venues } from '@/lib/mockData';
import { Moon, Cloud, MapPin, Users } from 'lucide-react';

interface EventCardProps {
  event: AstroEvent;
}

export function EventCard({ event }: EventCardProps) {
  const venue = venues[event.venueId as keyof typeof venues];
  const eventDate = new Date(event.date);
  
  // Format date for display
  const dateStr = eventDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  
  const timeStr = eventDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  // Get status styling
  const getStatusStyling = () => {
    if (!event.isAvailable) {
      return {
        cardClass: 'opacity-50 cursor-not-allowed',
        badgeClass: 'bg-gray-400 text-white',
        buttonClass: 'bg-gray-300 text-gray-600 cursor-not-allowed',
        buttonText: 'Unavailable'
      };
    }
    
    switch (event.status) {
      case 'Greenlit':
        return {
          cardClass: 'ring-2 ring-echo-teal',
          badgeClass: 'bg-echo-teal text-white',
          buttonClass: 'bg-echo-teal hover:bg-echo-teal/90 text-white',
          buttonText: 'Secure Your Seat'
        };
      case 'Momentum':
      case 'Pending':
        return {
          cardClass: 'hover:shadow-lg transition-shadow',
          badgeClass: 'bg-origin-brown text-white',
          buttonClass: 'bg-origin-brown hover:bg-origin-brown/90 text-white',
          buttonText: 'Pledge Interest'
        };
      default:
        return {
          cardClass: 'opacity-50',
          badgeClass: 'bg-gray-400 text-white',
          buttonClass: 'bg-gray-300 text-gray-600 cursor-not-allowed',
          buttonText: 'Blocked'
        };
    }
  };

  // Get suitability icon and color
  const getSuitabilityIcon = () => {
    switch (event.suitability) {
      case 'DSO Prime':
        return <Moon className="w-4 h-4 text-echo-teal" />;
      case 'LO Prime':
        return <Moon className="w-4 h-4 text-origin-brown fill-current" />;
      case 'Mixed Viewing':
        return <Cloud className="w-4 h-4 text-origin-brown" />;
      default:
        return <Moon className="w-4 h-4 text-gray-400" />;
    }
  };

  const styling = getStatusStyling();

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border border-gray-100 ${styling.cardClass}`}>
      {/* Header with Date and Status Badge */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-sans font-semibold text-lg text-charcoal">{dateStr}</h3>
          <p className="font-serif text-sm text-charcoal/70">{timeStr}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-sans font-medium ${styling.badgeClass}`}>
          {event.status}
        </span>
      </div>

      {/* Venue Information */}
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-4 h-4 text-origin-brown" />
        <div>
          <p className="font-sans font-medium text-charcoal">{venue.name}</p>
          <p className="font-serif text-sm text-charcoal/70">{venue.location}</p>
        </div>
      </div>

      {/* Suitability and Moon Phase */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          {getSuitabilityIcon()}
          <span className="font-serif text-sm text-charcoal/80">{event.suitability}</span>
        </div>
        <div className="text-sm font-serif text-charcoal/70">
          {Math.round(event.moonIllumination * 100)}% illumination
        </div>
      </div>

      {/* Pledge Count */}
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-4 h-4 text-origin-brown" />
        <span className="font-serif text-sm text-charcoal/80">
          {event.pledgeCount} / 8 pledges
        </span>
        {event.pledgeCount >= 6 && event.status === 'Greenlit' && (
          <span className="text-xs font-sans text-echo-teal font-medium">• Greenlit!</span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className="bg-echo-teal h-2 rounded-full transition-all duration-300"
          style={{ width: `${Math.min((event.pledgeCount / 8) * 100, 100)}%` }}
        />
      </div>

      {/* Action Button */}
      <button
        className={`w-full py-2 px-4 rounded-lg font-sans font-medium text-sm transition-colors ${styling.buttonClass}`}
        disabled={!event.isAvailable || event.status === 'Blocked'}
      >
        {styling.buttonText}
      </button>
    </div>
  );
}
