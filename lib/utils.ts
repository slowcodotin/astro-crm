import { isWithinInterval, parseISO, differenceInCalendarDays, startOfDay } from 'date-fns';
import { AstroEvent, FacilitatorBlock, VenueBlock } from './index';
import { logger } from './logger';

export function getSanitizedEvents(
  rawEvents: AstroEvent[],
  personalBlocks: FacilitatorBlock[],
  venueBlocks: VenueBlock[]
): AstroEvent[] {
  logger.info(`--- Starting Triple-Lock Sanitization (${rawEvents.length} events) ---`);

  // STEP 1: Determine Absolute Viability (Lock 1 & Lock 2)
  // We check PTO and Venue availability first to identify "Real" events.
  const viableEvents = rawEvents.map((event) => {
    const eventDate = startOfDay(parseISO(event.date));

    // LOCK 1: Facilitator PTO
    const ptoCollision = personalBlocks.find((block) =>
      isWithinInterval(eventDate, {
        start: startOfDay(parseISO(block.start)),
        end: startOfDay(parseISO(block.end)),
      })
    );
    if (ptoCollision) {
      logger.warn(`LOCK 1: [${event.id}] Blocked by PTO: ${ptoCollision.title}`);
      return { ...event, status: 'Blocked' as const, isAvailable: false };
    }

    // LOCK 2: Venue Availability
    const venueCollision = venueBlocks.find((block) =>
      block.venueId === event.venueId &&
      isWithinInterval(eventDate, {
        start: startOfDay(parseISO(block.start)),
        end: startOfDay(parseISO(block.end)),
      })
    );
    if (venueCollision) {
      logger.warn(`LOCK 2: [${event.id}] Blocked by Venue Conflict: ${venueCollision.title}`);
      return { ...event, status: 'Blocked' as const, isAvailable: false };
    }

    return { ...event, isAvailable: true };
  });

  // STEP 2: Identify Active Anchors
  // An event only exerts a buffer "force" if it is Greenlit AND physically possible.
  const activeAnchors = viableEvents.filter((e) => e.status === 'Greenlit' && e.isAvailable);
  logger.debug(`Active Anchors identified: ${activeAnchors.length}`, activeAnchors.map(a => a.id));

  // STEP 3: Apply Buffer Logic (Lock 3) and Quorum Upgrades
  return viableEvents.map((event) => {
    // If already blocked by Lock 1 or 2, don't bother checking buffers
    if (!event.isAvailable) return event;

    const eventDate = startOfDay(parseISO(event.date));

    for (const anchor of activeAnchors) {
      if (anchor.id === event.id) continue;

      const anchorDate = startOfDay(parseISO(anchor.date));
      const dayDiff = Math.abs(differenceInCalendarDays(eventDate, anchorDate));

      // LOCK 3a: Same Site (1-day gap)
      if (event.venueId === anchor.venueId) {
        if (dayDiff > 0 && dayDiff < 2) {
          logger.info(`LOCK 3: [${event.id}] Blocked by same-site buffer vs ${anchor.id}`);
          return { ...event, status: 'Blocked' as const, isAvailable: false };
        }
      } 
      // LOCK 3b: Different Site (2-day travel gap)
      else {
        if (dayDiff > 0 && dayDiff < 3) {
          logger.info(`LOCK 3: [${event.id}] Blocked by cross-site travel buffer vs ${anchor.id}`);
          return { ...event, status: 'Blocked' as const, isAvailable: false };
        }
      }
    }

    // LOCK 4: Dynamic Quorum Upgrades (only for events not manually Greenlit)
    let finalStatus = event.status;
    if (event.status !== 'Greenlit') {
      if (event.pledgeCount >= 6) {
        finalStatus = 'Greenlit';
        logger.info(`LOCK 4: [${event.id}] UPGRADED to Greenlit (Pledges: ${event.pledgeCount})`);
      } else if (event.pledgeCount >= 4) {
        finalStatus = 'Momentum';
        logger.debug(`LOCK 4: [${event.id}] Status: Momentum`);
      } else {
        finalStatus = 'Pending';
      }
    }

    return { ...event, status: finalStatus };
  });
}
