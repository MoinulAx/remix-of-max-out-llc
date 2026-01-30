import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';

const youtubeVideos = [
  { id: 'uy1F5cacCzg', title: 'Sky Bank' },
  { id: 'P1CQ6fZGTjk', title: 'Sstels' },
  { id: 'QarooJx_QvY', title: 'Runway' },
  { id: 'jZFPDOxpE64', title: 'Use Knight' },
  { id: 'FlX7mMj-f0k', title: "Don't Stop It" },
];

const storyBubbles = [
  { name: 'EV09 Loso', url: 'https://www.instagram.com/reel/DSx9bj3j2-I/', image: '/roster/ev09-loso.jpg' },
  { name: 'Post', url: 'https://www.instagram.com/p/Ca2mkGEtfxx/', image: '/lovable-uploads/4d40bf6f-b67b-4203-a5d4-4448b598571b.png' },
  { name: 'Post', url: 'https://www.instagram.com/p/DS_G5tykgav/', image: '/lovable-uploads/668fe744-10e4-4ce2-bb26-81b67d7c0815.png' },
  { name: 'Anais', url: 'https://www.instagram.com/reel/DI9oLR9yUG7/', image: '/roster/Anais.jpg' },
];

const pressNews = [
  {
    title: 'Max Out Method Tour Takes Over New York City Times Square',
    body: "NYC stood still as the Max Out Method Tour officially touched down in Times Square. Led by Sheedy the Plug and featuring the heavy-hitting sounds of Hot 97.1's own DJ Drewski, the event marked a historic milestone for Max Out Management LLC and EPC Studios. The energy was unmatched as the movement bridged the gap between independent hustle and mainstream industry power.",
  },
  {
    title: 'Max Out Method Tour Coming to a City Near You',
    body: 'The movement is moving. Following the massive success in NYC, the Max Out Method Tour is hitting the road to discover the next generation of Fully Invested talent. Stay tuned for dates and locations.',
  },
  {
    title: 'EPC Studios Projects on the Way',
    body: 'We are currently in the lab finalizing exclusive projects and visuals. High-impact drops and artist collaborations are in post-production to build the hype for 2026.',
  },
];

const ContentHub = () => {
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

          {/* Featured Video - EV09 Loso */}
          <FadeIn delay={100}>
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-4">Featured: EV09 Loso</h2>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <iframe
                  src="https://www.youtube.com/embed/tqAfN9iqzk8"
                  title="EV09 Loso - Featured Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </FadeIn>

          {/* Content Sections */}
          <div className="space-y-16">
            {/* Social Media - Story Bubbles */}
            <FadeIn delay={150}>
              <div>
                <h2 className="text-3xl font-bold mb-6">Social Media</h2>
                <div className="flex gap-6 overflow-x-auto pb-4 mb-8">
                  {storyBubbles.map((story, index) => (
                    <a 
                      key={index}
                      href={story.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 group flex-shrink-0 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 group-hover:scale-110 transition-transform duration-300">
                        <div className="w-full h-full rounded-full bg-background p-[2px]">
                          {story.image ? (
                            <img 
                              src={story.image} 
                              alt={story.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">IG</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-medium text-center max-w-[80px] truncate">{story.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* YouTube */}
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
                        src={`https://www.youtube.com/embed/${video.id}`}
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

            {/* Press & News */}
            <FadeIn delay={300}>
              <div>
                <h2 className="text-3xl font-bold mb-6">Press & News</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {pressNews.map((article, index) => (
                    <div 
                      key={index} 
                      className="border rounded-lg overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-300 group animate-fade-in"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">{article.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{article.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Footer Note */}
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
