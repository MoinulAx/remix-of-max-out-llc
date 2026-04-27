import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { useSupabaseTable } from '@/hooks/useSupabaseTable';

const Leadership = () => {
  const { rows: members, loading } = useSupabaseTable('roster', { orderBy: 'sort_order', ascending: true });
  const leadership = members.filter(m => m.category === 'leadership');
  const ceo = leadership.find(m => {
    const links = (m.social_links ?? {}) as Record<string, unknown>;
    return links.is_founder === true;
  });
  const team = leadership.filter(m => m !== ceo);

  return (
    <main className="relative min-h-screen">
      <Header />

      <section className="pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Leadership</h1>
            <p className="text-xl text-muted-foreground mb-16 max-w-3xl">
              Meet the visionaries behind Max Out Management—connecting creativity with strategy.
            </p>
          </FadeIn>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* CEO Highlight */}
              {ceo && (
                <FadeIn delay={100}>
                  <div className="mb-24">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                        <img
                          src={ceo.image_url ?? '/leadership/rasheed-moon.heic'}
                          alt={ceo.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-2">{ceo.name}</h2>
                        <p className="text-xl text-primary mb-6">
                          {((ceo.social_links ?? {}) as Record<string, unknown>).title as string ?? 'Owner / CEO'}
                        </p>
                        <div className="space-y-4 text-muted-foreground">
                          {ceo.bio ? (
                            ceo.bio.split('\n').filter(Boolean).map((para, i) => (
                              <p key={i}>{para}</p>
                            ))
                          ) : (
                            <>
                              <p>Rasheed Moon is the visionary founder of Max Out Management LLC, connecting the creative excellence of EPC Studios LLC with the financial innovation of Fully Invested Network LLC.</p>
                              <p>With a deep commitment to maximizing talent potential and building lasting legacies, Rasheed has established Max Out Management as a premier destination for world-class representation and strategic growth.</p>
                              <p>Under his leadership, the company has become synonymous with excellence, innovation, and unwavering dedication to client success.</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* Team Grid */}
              {team.length > 0 && (
                <FadeIn delay={200}>
                  <h2 className="text-3xl font-bold mb-12">Our Team</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {team.map((member, index) => {
                      const links = (member.social_links ?? {}) as Record<string, unknown>;
                      const title = links.title as string | undefined;
                      return (
                        <div key={member.id} className="group">
                          <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
                            {member.image_url ? (
                              <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary/5 to-accent/5" />
                            )}
                          </div>
                          <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                          {title && <p className="text-primary text-sm">{title}</p>}
                        </div>
                      );
                    })}
                  </div>
                </FadeIn>
              )}
            </>
          )}

          {/* Mission Statement */}
          <FadeIn delay={300}>
            <div className="mt-24 p-12 bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl border">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Mission</h2>
              <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
                To provide unparalleled representation that empowers talent, cultivates innovation, and delivers transformative results for artists, creators, and brands worldwide.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Leadership;
