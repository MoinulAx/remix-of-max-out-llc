import React, { useEffect } from 'react';
import { Instagram, Linkedin, Globe, Music } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSupabaseTable } from '@/hooks/useSupabaseTable';

const Team = () => {
  const { rows: members, loading } = useSupabaseTable('roster', { orderBy: 'sort_order', ascending: true });
  const team = members.filter(m => m.category === 'team');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="relative">
      <Header />
      <div className="pt-24 pb-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Meet the Team</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              A passionate team of creators, developers, and strategists dedicated to bringing your vision to life
            </p>
          </FadeIn>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {team.map((member, index) => {
                const links = (member.social_links ?? {}) as Record<string, unknown>;
                const role = links.role as string | undefined;
                const skills = (links.skills as string[] | undefined) ?? [];
                const instagram = links.instagram as string | undefined;
                const linkedin = links.linkedin as string | undefined;
                const website = links.website as string | undefined;
                const tiktok = links.tiktok as string | undefined;

                return (
                  <FadeIn key={member.id} delay={100 + index * 100}>
                    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <CardHeader className="text-center pb-4">
                        <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-accent/20">
                          <img
                            src={member.image_url ?? '/placeholder.svg'}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardTitle className="text-xl font-bold text-foreground">{member.name}</CardTitle>
                        {role && <p className="text-primary font-medium">{role}</p>}
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {member.bio && (
                          <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                        )}
                        {skills.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-foreground mb-2 text-sm">Expertise</h4>
                            <div className="flex flex-wrap gap-2">
                              {skills.map((skill, idx) => (
                                <span key={idx} className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="flex justify-center gap-2 pt-2">
                          {instagram && (
                            <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                              <a href={instagram} target="_blank" rel="noopener noreferrer"><Instagram className="h-4 w-4" /></a>
                            </Button>
                          )}
                          {linkedin && (
                            <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                              <a href={linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="h-4 w-4" /></a>
                            </Button>
                          )}
                          {website && (
                            <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                              <a href={website} target="_blank" rel="noopener noreferrer"><Globe className="h-4 w-4" /></a>
                            </Button>
                          )}
                          {tiktok && (
                            <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                              <a href={tiktok} target="_blank" rel="noopener noreferrer"><Music className="h-4 w-4" /></a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </FadeIn>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Team;
