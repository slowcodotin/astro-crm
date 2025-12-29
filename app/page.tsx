import { WeatherGrid } from '@/components/WeatherGrid';
import { mockEvents } from '@/lib/mockData';
import { Star, Telescope } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-charcoal via-charcoal to-echo-teal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            {/* Logo/Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Telescope className="w-16 h-16 text-ivory" />
                <Star className="w-6 h-6 text-ivory absolute -top-2 -right-2 animate-pulse" />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="font-sans text-4xl lg:text-6xl font-bold mb-6 tracking-tight">
              Echoes and Origins
            </h1>

            {/* Subheading */}
            <p className="font-serif text-xl lg:text-2xl mb-8 text-ivory/90 max-w-3xl mx-auto leading-relaxed">
              High-end astronomy retreats for mindful stargazing experiences across pristine dark-sky locations
            </p>

            {/* Description */}
            <p className="font-serif text-lg mb-12 text-ivory/80 max-w-4xl mx-auto leading-relaxed">
              Join fellow astronomy enthusiasts for curated celestial experiences. Each retreat is carefully planned
              around optimal lunar conditions, ensuring the perfect balance between deep-sky object observation
              and lunar/planetary viewing opportunities.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-ivory text-charcoal px-8 py-3 rounded-lg font-sans font-semibold hover:bg-ivory/90 transition-colors">
                Explore Upcoming Events
              </button>
              <button className="border-2 border-ivory text-ivory px-8 py-3 rounded-lg font-sans font-semibold hover:bg-ivory/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-sans text-3xl lg:text-4xl font-bold text-charcoal mb-4">
            Upcoming Astronomy Retreats
          </h2>
          <p className="font-serif text-lg text-charcoal/70 max-w-2xl mx-auto">
            Discover your next stargazing adventure. Each event is optimized for specific celestial conditions,
            from new moon DSO sessions to lunar observation experiences.
          </p>
        </div>

        {/* Events Grid */}
        <WeatherGrid events={mockEvents} />
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-ivory py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Telescope className="w-8 h-8" />
            </div>
            <p className="font-sans text-lg font-semibold mb-2">Echoes and Origins</p>
            <p className="font-serif text-sm text-ivory/70">
              Curated astronomy experiences for the mindful stargazer
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
