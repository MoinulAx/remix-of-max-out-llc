import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { useSupabaseTable } from '@/hooks/useSupabaseTable';

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const PartnerCard = ({ partner, linkLabel }: { partner: { name: string; description: string | null; website: string | null; logo_url: string | null }; linkLabel: string }) => (
  <div className="p-6 border rounded-xl hover:shadow-lg hover:border-primary/50 transition-all bg-card">
    {partner.logo_url && (
      <div className="mb-4 h-20 flex items-center justify-start">
        <img
          src={partner.logo_url}
          alt={partner.name}
          className="max-h-20 max-w-[160px] object-contain"
        />
      </div>
    )}
    <h3 className="text-xl font-bold mb-2">{partner.name}</h3>
    <p className="text-muted-foreground mb-4">{partner.description}</p>
    {partner.website && (
      <a
        href={partner.website}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
      >
        <InstagramIcon />
        {linkLabel}
      </a>
    )}
  </div>
);

const Partners = () => {
  const { rows, loading } = useSupabaseTable('partners', { orderBy: 'sort_order', ascending: true });
  const companies = rows.filter(p => p.partner_type !== 'individual');
  const individuals = rows.filter(p => p.partner_type === 'individual');

  return (
    <main className="relative min-h-screen">
      <Header />

      <section className="pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="mb-16 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Partners</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Strategic partnerships that amplify our impact in music, fashion, and creative industries.
              </p>
            </div>
          </FadeIn>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {companies.length > 0 && (
                <FadeIn delay={100}>
                  <div className="mb-20">
                    <h2 className="text-3xl font-bold mb-8 text-center">Partnered Companies & Platforms</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {companies.map(p => (
                        <PartnerCard key={p.id} partner={p} linkLabel="View Profile" />
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}

              {individuals.length > 0 && (
                <FadeIn delay={200}>
                  <div className="mb-20">
                    <h2 className="text-3xl font-bold mb-8 text-center">Key Industry Partners</h2>
                    <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                      {individuals.map(p => (
                        <PartnerCard key={p.id} partner={p} linkLabel="Connect on Instagram" />
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Partners;
