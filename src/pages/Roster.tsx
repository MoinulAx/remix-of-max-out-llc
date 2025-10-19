import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { Link } from 'react-router-dom';

const Roster = () => {
  const talents = [
    { name: 'Artist Name', specialty: 'Photography', availability: 'available' },
    { name: 'Creator Name', specialty: 'Videography', availability: 'pending' },
    { name: 'Model Name', specialty: 'Fashion', availability: 'booked' },
    { name: 'Director Name', specialty: 'Film', availability: 'available' },
    { name: 'Influencer Name', specialty: 'Social Media', availability: 'available' },
    { name: 'Producer Name', specialty: 'Music', availability: 'pending' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'booked': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <main className="relative min-h-screen">
      <Header />
      
      <section className="pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Talent Roster</h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
              Our exclusive roster of world-class talent. Click any profile to view full portfolio and booking calendar.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {talents.map((talent, index) => (
              <FadeIn key={index} delay={index * 100}>
                <Link to={`/roster/${talent.name.toLowerCase().replace(' ', '-')}`} className="block group">
                  <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <div className="aspect-[3/4] bg-muted"></div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <div className={`${getStatusColor(talent.availability)} w-4 h-4 rounded-full`}></div>
                    </div>

                    {/* Info Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-6">
                      <div className="w-full">
                        <h3 className="text-white text-2xl font-bold mb-2">{talent.name}</h3>
                        <p className="text-white/80 mb-4">{talent.specialty}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-white text-sm capitalize">{talent.availability}</span>
                          <span className="text-white group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          {/* Legend */}
          <FadeIn delay={600}>
            <div className="mt-12 p-6 bg-muted rounded-lg">
              <h3 className="font-semibold mb-4">Availability Legend:</h3>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <span>Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <span>Booked</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Roster;
