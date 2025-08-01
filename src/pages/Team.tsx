import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from '@/components/animations/FadeIn';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Team = () => {
  const teamMembers = [
    {
      name: "Rummy Developer",
      role: "Founder & Lead Developer",
      bio: "Full-stack developer with 8+ years of experience building scalable web applications and leading development teams.",
      skills: ["React", "Node.js", "Python", "AWS", "UI/UX Design"],
      image: "/lovable-uploads/34a58283-8b82-48f9-88f4-2c88b069921d.png"
    },
    {
      name: "Sarah Chen",
      role: "Senior Designer",
      bio: "Creative designer specialized in brand identity and user experience with a passion for minimalist aesthetics.",
      skills: ["UI/UX", "Branding", "Figma", "Adobe Creative Suite"],
      image: "/lovable-uploads/af28398b-9e23-4e2b-9de1-bda457e09fd8.png"
    },
    {
      name: "Marcus Johnson",
      role: "Marketing Strategist",
      bio: "Digital marketing expert helping brands grow their online presence through data-driven strategies.",
      skills: ["SEO", "Content Marketing", "Analytics", "Social Media"],
      image: "/lovable-uploads/dabbf929-5dd0-4794-a011-fe43bf4b3418.png"
    }
  ];

  return (
    <main className="relative">
      <Header />
      
      <section className="pt-24 pb-20 md:py-32 bg-gradient-to-br from-background to-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Meet the Team
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              A passionate team of creators, developers, and strategists dedicated to bringing your vision to life
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <FadeIn key={member.name} delay={100 + (index * 100)}>
                <Card className="h-full transition-all duration-300 hover:shadow-[var(--shadow-sharp)] hover:-translate-y-1 border-0 shadow-[var(--shadow-card)] bg-card/80 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">{member.name}</CardTitle>
                    <p className="text-primary font-medium">{member.role}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.bio}
                    </p>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-sm">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={400} className="text-center mt-16">
            <div className="bg-card/80 backdrop-blur-sm shadow-[var(--shadow-card)] p-8 md:p-12 max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Team</h2>
              <p className="text-muted-foreground mb-6">
                We're always looking for talented individuals who share our passion for creating exceptional digital experiences.
              </p>
              <button className="bg-primary text-primary-foreground px-8 py-3 font-medium hover:bg-primary/90 transition-colors">
                View Open Positions
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Team;