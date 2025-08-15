import React, { useEffect } from 'react';
import { Instagram, Linkedin, Globe, Music } from 'lucide-react';

import FadeIn from '@/components/animations/FadeIn';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Team = () => {
  const teamMembers = [
    {
      name: "Moinul K",
      role: "Founder, Developer & Photographer",
      bio: "Founder of RummSpace, is a Software Engineer and Media Creator experienced in backend, frontend, and full-stack development. With a background in networking, security, AV systems, and photo/video production, he builds scalable, secure applications and produces creative, high-impact media solutions.",
      skills: ["React", "Node.js", "Python", "Photography", "UI/UX Design", "Auobe Lightroom", "Adobe Premiere Pro"],
      image: "/lovable-uploads/moinul-pfp.jpeg",
      social: {
        instagram: "https://instagram.com/rummyshoots",
        linkedin: "https://www.linkedin.com/in/moinul-khan-647535238/",
        website: "https://moinul-khan-web.netlify.app/"
      }
    },
    {
      name: "Larry Lamouth",
      role: "Full Stack Developer & Cybersecurity Specialist",
      bio: "Full Stack Developer skilled in building scalable applications with React, Node.js, PostgreSQL, and Express. Currently expanding his expertise in cybersecurity, he combines technical excellence with strong communication to deliver impactful, real-world solutions.",
      skills: ["React", "Node.js", "PostgreSQL", "Express","WireShark"],
      image: "/lovable-uploads/larrypic-main.jpeg",
      social: {
        linkedin: "https://www.linkedin.com/in/larryalamouth/", 
        website: "https://larrylamouth.com/"

      }
    },
    {
      name: "Chris",
      role: "Video & Motion",
      bio: "Focuses on clean, user-centered design and brand consistency.",
      skills: ["UI/UX", "Branding", "Figma"],
      image: "/placeholder.svg",
      social: {
        instagram: "https://instagram.com/chris.design",
        website: "https://chris-portfolio.com"
      }
    },
    {
      name: "Zainab",
      role: "Content & Social",
      bio: "Creates compelling content and manages social engagement.",
      skills: ["Content Writing", "Social Media", "Photography"],
      image: "/placeholder.svg",
      social: {
        instagram: "https://instagram.com/zainab.creates",
        tiktok: "https://tiktok.com/@zainab.creates",
        linkedin: "https://linkedin.com/in/zainab"
      }
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

   return (
    <main className="relative">
      <Header />
      
      <div className="pt-24 pb-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Meet the Team
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              A passionate team of creators, developers, and strategists dedicated to bringing your vision to life
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <FadeIn key={member.name} delay={100 + (index * 100)}>
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardHeader className="text-center pb-4">
                    <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-accent/20">
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
                            className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex justify-center gap-2 pt-2">
                      {member.social?.instagram && (
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                        >
                          <a href={member.social.instagram} target="_blank" rel="noopener noreferrer">
                            <Instagram className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {member.social?.linkedin && (
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                        >
                          <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {member.social?.website && (
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                        >
                          <a href={member.social.website} target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {member.social?.tiktok && (
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                        >
                          <a href={member.social.tiktok} target="_blank" rel="noopener noreferrer">
                            <Music className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Team;