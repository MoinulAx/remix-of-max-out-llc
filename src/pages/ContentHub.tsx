import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';

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

          {/* Featured Video */}
          <FadeIn delay={100}>
            <div className="mb-16">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-muted-foreground">Featured Video Embed</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Content Sections */}
          <div className="space-y-16">
            {/* YouTube */}
            <FadeIn delay={200}>
              <div>
                <h2 className="text-3xl font-bold mb-6">YouTube Channel</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-video bg-muted rounded-lg"></div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Social Media */}
            <FadeIn delay={300}>
              <div>
                <h2 className="text-3xl font-bold mb-6">Social Media</h2>
                <div className="grid md:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-muted rounded-lg"></div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Press & News */}
            <FadeIn delay={400}>
              <div>
                <h2 className="text-3xl font-bold mb-6">Press & News</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-6 border rounded-lg hover:border-primary transition-colors">
                      <h3 className="font-bold text-lg mb-2">Press Release Title</h3>
                      <p className="text-muted-foreground text-sm mb-2">Date: Month Day, Year</p>
                      <p className="text-muted-foreground">Brief description of the press release or news article...</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Footer Note */}
          <FadeIn delay={500}>
            <div className="mt-16 p-8 bg-muted rounded-lg text-center">
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
