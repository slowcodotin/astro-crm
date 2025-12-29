# Task: Develop "Echoes and Origins" Astro-Retreat Dashboard

## Context & Brand Identity
- **Project:** A high-end astronomy retreat management system ("Astro-CRM") under the brand "Echoes and Origins".
- **Visual Aesthetic:** Mindful, organic, premium, and "Slow Living".
- **Primary Colors:** - Echo Teal: `#3A666D` (Headings/Buttons)
    - Origin Brown: `#7B5C4F` (Accents/Secondary)
    - Ivory: `#F7F5EC` (Main Background)
    - Charcoal: `#2D323A` (Body Text)
- **Typography:** - Headings: Montserrat (Sans-serif)
    - Body: Merriweather (Serif)

## Functional Logic (The Triple-Lock)
1. **Quorum Logic:** Standard capacity is 8. "Greenlight" happens at 6 pledges.
2. **Suitability Index:** - < 20% illumination: "DSO Prime"
    - 20-50% illumination: "Mixed Viewing"
    - > 50% illumination: "LO Prime" (Lunar)
3. **Availability States:**
    - `Available`: Show "Pledge Interest" (Link to Tally).
    - `Greenlit`: Show "Secure Your Seat" (Link to Razorpay).
    - `Unavailable`: Card is grayed out/de-emphasized (due to PTO, Travel Buffer, or Venue Conflict).

## Technical Requirements
- **Framework:** Next.js 15 (App Router), Tailwind CSS, TypeScript.
- **Component Pattern:** Create a standalone `EventCard` component and a parent `WeatherGrid`.
- **Icons:** Use `lucide-react` for minimalist icons (Moon, Cloud, MapPin, Users).
- **Data Shape:** Use the `AstroEvent` interface defined in `@/lib/index.ts`.
- **Layout:** Fully responsive. Use `Ivory` for the page background and `Charcoal` for text readability.

## Page Structure Instructions
1. **Hero Section:** Poetic headline using Montserrat (H1) and a short brand mission statement using Merriweather.
2. **Filters (Optional):** Simple toggle between "All Sites" and specific Venue names.
3. **The Grid:** Display a list of upcoming celestial windows.
4. **Mock Data:** Generate 5 sample events to demonstrate UI states:
    - 1 Greenlit (Coorg - Jan 14)
    - 1 Unavailable (Wayanad - Jan 15 - blocked by facilitator buffer)
    - 2 Pending/Gathering (Nov 2, Nov 12)
    - 1 Emerging (New Moon window)

## Execution
Please generate the code for `app/page.tsx` and any necessary sub-components. Ensure all Tailwind classes use the brand colors defined in `tailwind.config.ts`.
