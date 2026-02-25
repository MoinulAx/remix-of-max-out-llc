import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { Link } from 'react-router-dom';

const Roster = () => {
  const talentCategories = [
    {
      category: "Artists, Models & Actors",
      talents: [
        { name: 'EV09 Loso', specialty: 'Artist, Model, Actor, Fashion Designer', availability: 'available', instagram: 'https://www.instagram.com/ev09loso/', image: '/roster/ev09-loso.jpg' },
        { name: 'Sky Banks', specialty: 'Artist, Model, Actor, Author', availability: 'available', instagram: 'https://www.instagram.com/skybanksofficial/', image: '/roster/sky-banks.jpeg' },
        { name: 'Flaco', specialty: 'Artist, Model, Actor', availability: 'available', instagram: 'https://www.instagram.com/whois.flac0/', image: '/roster/Flaco.jpg' },
        { name: 'Sstel', specialty: 'Artist, Model, Actor, Host', availability: 'available', instagram: '#', image: '/roster/sstel.jpeg' },
        { name: 'Pretty Boi Green', specialty: 'Artist, Model, Actor', availability: 'pending', instagram: 'https://www.instagram.com/prettyboi_green/', image: '/roster/pretty-boi-green.png' },
        { name: 'P-take', specialty: 'Artist, Model, Actor', availability: 'available', instagram: 'https://www.instagram.com/ptakee1/', image: '/roster/p-take.jpg' },
        { name: 'Anais', specialty: 'Artist, Model, Song Writer', availability: 'available', instagram: 'https://www.instagram.com/_anais_xo99/', image: '/roster/Anais.jpg' },
      ]
    },
    {
      category: "Content Creators",
      talents: [
        { name: 'Partii', specialty: 'Content Creator, Model, Creative Director, Host', availability: 'available', instagram: 'https://www.instagram.com/partii__21/', image: '/roster/Partii.jpg' },
        { name: 'Danny Nym', specialty: 'Content Creator', availability: 'available', instagram: 'https://www.instagram.com/danny.nym/', image: '/roster/Danny-Nym.jpg' },
        { name: 'Kay Talks Lyfe', specialty: 'Content Creator, Entrepreneur', availability: 'pending', instagram: 'https://www.youtube.com/@KayTalksLyfe', image: '/roster/kay-talks-lyfe.png' },
        { name: 'Yaggi Baby', specialty: 'Content Creator, Entrepreneur', availability: 'booked', instagram: 'https://www.instagram.com/yaggii.baby/', image: '/roster/yaggi-baby.png' },
        { name: 'Film by Jwxra', specialty: 'Photographer, Videographer', availability: 'available', instagram: 'https://www.instagram.com/jwxra/', image: '/roster/jwxra.jpeg' },
        { name: 'Mr.ifykyk', specialty: 'Content Creator, Model, Actor', availability: 'available', instagram: 'https://www.instagram.com/mr.ifykyk__/', image: '/roster/mr-ifykyk.jpg' },
      ]
    },
    {
      category: "Producers",
      talents: [
        { name: 'Joe BPM', specialty: 'Producer', availability: 'available', instagram: '#', image: '/roster/joe-bpm.png' },
      ]
    }
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

          {talentCategories.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-16">
              <FadeIn delay={sectionIndex * 100}>
                <h2 className="text-3xl font-bold mb-8 border-b border-border pb-4">{section.category}</h2>
              </FadeIn>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.talents.map((talent, index) => (
                  <FadeIn key={index} delay={(sectionIndex * 100) + (index * 50)}>
                    <div className="block group">
                      <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                        {talent.image ? (
                          <img 
                            src={talent.image} 
                            alt={talent.name}
                            className="aspect-[3/4] w-full h-full object-cover"
                          />
                        ) : (
                          <div className="aspect-[3/4] bg-muted"></div>
                        )}
                        
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4">
                          <div className={`${getStatusColor(talent.availability)} w-4 h-4 rounded-full`}></div>
                        </div>

                        {/* Instagram Link */}
                        {talent.instagram && talent.instagram !== '#' && (
                          <a 
                            href={talent.instagram} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="absolute top-4 left-4 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors z-10"
                          >
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          </a>
                        )}

                        {/* Info Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-6">
                          <div className="w-full">
                            <h3 className="text-white text-2xl font-bold mb-2">{talent.name}</h3>
                            <p className="text-white/80 mb-4 text-sm">{talent.specialty}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-white text-sm capitalize">{talent.availability}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          ))}

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
