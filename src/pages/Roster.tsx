import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { useSupabaseTable } from '@/hooks/useSupabaseTable';
import ApplicationModal from '@/components/ApplicationModal';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from '@/components/ui/sheet';
import type { Database } from '@/integrations/supabase/types';

type RosterRow = Database['public']['Tables']['roster']['Row'];

const ROSTER_CATEGORIES = ['Artists, Models & Actors', 'Content Creators', 'Producers'];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available': return 'bg-green-500';
    case 'pending':   return 'bg-yellow-500';
    case 'booked':    return 'bg-red-500';
    default:          return 'bg-gray-500';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'available': return 'Available for booking';
    case 'pending':   return 'Pending availability';
    case 'booked':    return 'Currently booked';
    default:          return status;
  }
};

const Roster = () => {
  const { rows, loading } = useSupabaseTable('roster', { orderBy: 'sort_order', ascending: true });
  const [applyOpen, setApplyOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<RosterRow | null>(null);

  const talent = rows.filter(r => ROSTER_CATEGORIES.includes(r.category ?? '')) as RosterRow[];

  const byCategory = ROSTER_CATEGORIES.map(cat => ({
    category: cat,
    members: talent.filter(r => r.category === cat),
  })).filter(s => s.members.length > 0);

  return (
    <main className="relative min-h-screen">
      <Header />

      <section className="pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Talent Roster</h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
              Our exclusive roster of world-class talent. Click any profile to view full details and booking status.
            </p>
          </FadeIn>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {byCategory.map((section, sectionIndex) => (
                <div key={section.category} className="mb-16">
                  <FadeIn delay={sectionIndex * 100}>
                    <h2 className="text-3xl font-bold mb-8 border-b border-border pb-4">{section.category}</h2>
                  </FadeIn>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {section.members.map((member, index) => {
                      const links = (member.social_links ?? {}) as Record<string, string>;
                      const specialty    = links.specialty ?? '';
                      const availability = links.availability ?? 'available';
                      const instagram    = links.instagram ?? '';

                      return (
                        <FadeIn key={member.id} delay={(sectionIndex * 100) + (index * 50)}>
                          <button
                            type="button"
                            onClick={() => setSelectedMember(member)}
                            className="block w-full text-left group cursor-pointer"
                          >
                            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl hover:ring-2 hover:ring-primary/50 transition-all">
                              {member.image_url ? (
                                <img
                                  src={member.image_url}
                                  alt={member.name}
                                  className="aspect-[3/4] w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="aspect-[3/4] bg-muted" />
                              )}

                              {/* Status dot */}
                              <div className="absolute top-4 right-4">
                                <div className={`${getStatusColor(availability)} w-4 h-4 rounded-full`} />
                              </div>

                              {/* Instagram link — stop propagation so it doesn't open the sheet */}
                              {instagram && (
                                <a
                                  href={instagram}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="absolute top-4 left-4 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors z-10"
                                >
                                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                  </svg>
                                </a>
                              )}

                              {/* Info overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-6">
                                <div className="w-full">
                                  <h3 className="text-white text-2xl font-bold mb-2">{member.name}</h3>
                                  {specialty && <p className="text-white/80 mb-4 text-sm">{specialty}</p>}
                                  <span className="text-white text-sm capitalize">{availability}</span>
                                </div>
                              </div>
                            </div>
                          </button>
                        </FadeIn>
                      );
                    })}
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Legend */}
          <FadeIn delay={600}>
            <div className="mt-12 p-6 bg-muted rounded-lg">
              <h3 className="font-semibold mb-4">Availability Legend:</h3>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-green-500" /><span>Available</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-yellow-500" /><span>Pending</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-red-500" /><span>Booked</span></div>
              </div>
            </div>
          </FadeIn>

          {/* Roster application CTA */}
          <FadeIn delay={700}>
            <div className="mt-12 p-8 md:p-12 bg-primary text-primary-foreground rounded-2xl text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Want to Join Our Roster?</h2>
              <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
                We're always looking for talented artists, models, actors, content creators, and producers. Submit your application and we'll be in touch.
              </p>
              <button
                type="button"
                onClick={() => setApplyOpen(true)}
                className="inline-block bg-primary-foreground text-primary font-bold px-8 py-3 rounded-lg hover:bg-primary-foreground/90 transition-colors shadow-[var(--shadow-sharp)]"
              >
                Apply Now
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />

      <ApplicationModal
        isOpen={applyOpen}
        onClose={() => setApplyOpen(false)}
        variant="roster"
      />

      {/* Talent profile sheet */}
      <Sheet open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
        <SheetContent className="bg-zinc-950 border-zinc-800 text-white w-full sm:max-w-md overflow-y-auto">
          {selectedMember && (() => {
            const links = (selectedMember.social_links ?? {}) as Record<string, string>;
            const specialty    = links.specialty ?? '';
            const availability = links.availability ?? 'available';
            const instagram    = links.instagram ?? '';
            return (
              <>
                <SheetHeader>
                  <SheetTitle className="text-white text-2xl">{selectedMember.name}</SheetTitle>
                  {specialty && <p className="text-zinc-400 text-sm">{specialty}</p>}
                </SheetHeader>

                <div className="mt-6 space-y-6">
                  {selectedMember.image_url && (
                    <img
                      src={selectedMember.image_url}
                      alt={selectedMember.name}
                      className="w-full aspect-[3/4] object-cover rounded-lg"
                    />
                  )}

                  <div className="flex items-center gap-2">
                    <div className={`${getStatusColor(availability)} w-3 h-3 rounded-full`} />
                    <span className="text-sm text-zinc-300 capitalize">{getStatusLabel(availability)}</span>
                  </div>

                  {selectedMember.bio && (
                    <div>
                      <p className="text-xs uppercase tracking-wide text-zinc-500 mb-2">Bio</p>
                      <p className="text-zinc-200 text-sm leading-relaxed whitespace-pre-line">{selectedMember.bio}</p>
                    </div>
                  )}

                  {instagram && (
                    <a
                      href={instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-400 hover:underline"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Instagram
                    </a>
                  )}

                  <div className="pt-4 border-t border-zinc-800">
                    <button
                      type="button"
                      onClick={() => { setSelectedMember(null); setApplyOpen(true); }}
                      className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm"
                    >
                      Apply to Join Our Roster
                    </button>
                  </div>
                </div>
              </>
            );
          })()}
        </SheetContent>
      </Sheet>
    </main>
  );
};

export default Roster;
