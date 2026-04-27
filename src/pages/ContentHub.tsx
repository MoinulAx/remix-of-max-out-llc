import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { useSupabaseTable } from '@/hooks/useSupabaseTable';

const ContentHub = () => {
  const { rows, loading } = useSupabaseTable('content_hub_posts', { orderBy: 'sort_order', ascending: true });

  const published = rows.filter(p => p.is_published);
  const featured = published.find(p => p.media_type === 'youtube' && p.sort_order === 1);
  const youtubeVideos = published.filter(p => p.media_type === 'youtube' && p !== featured);
  const storyBubbles = published.filter(p => p.media_type === 'social');
  const pressItems = published.filter(p => p.media_type === 'press');

  return (
    <main className="relative min-h-screen">
      <Header />

      <section className="pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Content Hub</h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
              Explore our latest creative projects, media showcases, and featured work.
            </p>
          </FadeIn>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-16">
              {/* Featured Video */}
              {featured && (
                <FadeIn delay={100}>
                  <div className="mb-16">
                    <h2 className="text-2xl font-bold mb-4">Featured: EV09 Loso</h2>
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                      <iframe
                        src={featured.media_url ?? ''}
                        title={featured.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* Social Media Story Bubbles */}
              {storyBubbles.length > 0 && (
                <FadeIn delay={150}>
                  <div>
                    <h2 className="text-3xl font-bold mb-6">Social Media</h2>
                    <div className="flex gap-6 overflow-x-auto pb-4 mb-8">
                      {storyBubbles.map((story, index) => (
                        <a
                          key={story.id}
                          href={story.media_url ?? '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center gap-2 group flex-shrink-0 animate-fade-in"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 group-hover:scale-110 transition-transform duration-300">
                            <div className="w-full h-full rounded-full bg-background p-[2px]">
                              {story.thumbnail_url ? (
                                <img
                                  src={story.thumbnail_url}
                                  alt={story.title}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                                  <span className="text-xs text-muted-foreground">IG</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <span className="text-sm font-medium text-center max-w-[80px] truncate">{story.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* YouTube Videos */}
              {youtubeVideos.length > 0 && (
                <FadeIn delay={200}>
                  <div>
                    <h2 className="text-3xl font-bold mb-6">YouTube Channel</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {youtubeVideos.map((video, index) => (
                        <div
                          key={video.id}
                          className="aspect-video bg-muted rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 animate-fade-in"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <iframe
                            src={video.media_url ?? ''}
                            title={video.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* Press & News */}
              {pressItems.length > 0 && (
                <FadeIn delay={300}>
                  <div>
                    <h2 className="text-3xl font-bold mb-6">Press & News</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      {pressItems.map((article, index) => (
                        <div
                          key={article.id}
                          className="border rounded-lg overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-300 group animate-fade-in"
                          style={{ animationDelay: `${index * 150}ms` }}
                        >
                          <div className="h-2 bg-gradient-to-r from-primary to-accent" />
                          <div className="p-6">
                            <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">{article.title}</h3>
                            {article.description && (
                              <p className="text-muted-foreground text-sm leading-relaxed">{article.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}
            </div>
          )}

          <FadeIn delay={400}>
            <div className="mt-16 p-8 bg-muted rounded-lg text-center hover:bg-muted/80 transition-colors">
              <p className="text-sm text-muted-foreground">
                Content powered by <span className="font-semibold">EPC Studios LLC</span> — our in-house production partner.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContentHub;
