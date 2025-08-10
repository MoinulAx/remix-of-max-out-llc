import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from '@/components/animations/FadeIn';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { images } from '@/assets/images';
const Team = () => {
  const teamMembers = [
    {
      name: "Moinul K",
      role: "Founder, Developer & Photographer",
      bio: "Versatile creative professional combining technical expertise in full-stack development with artistic vision in photography, delivering comprehensive digital solutions.",
      skills: ["React", "Node.js", "Python", "Photography", "UI/UX Design"],
      image: images.team.founderRummyHeadshot
    },
    {
      name: "Sarah Chen",
      role: "Senior Designer",
      bio: "Creative designer specialized in brand identity and user experience with a passion for minimalist aesthetics.",
      skills: ["UI/UX", "Branding", "Figma", "Adobe Creative Suite"],
      image: images.team.sarahChenDesignerPortrait
    },
    {
      name: "Marcus Johnson",
      role: "Marketing Strategist",
      bio: "Digital marketing expert helping brands grow their online presence through data-driven strategies.",
      skills: ["SEO", "Content Marketing", "Analytics", "Social Media"],
      image: images.team.marcusJohnsonMarketerPhoto
    },
    {
      name: "Elena Rodriguez",
      role: "Content Creator",
      bio: "Skilled photographer and videographer with expertise in storytelling through visual media and social content creation.",
      skills: ["Photography", "Video Editing", "Social Media", "Creative Direction"],
      image: images.team.elenaRodriguezPhotographerHeadshot
    },
    {
      name: "Alex Thompson",
      role: "Technical Lead",
      bio: "Backend architect focused on building robust, scalable systems and optimizing performance for high-traffic applications.",
      skills: ["System Architecture", "Database Design", "DevOps", "Performance Optimization"],
      image: images.team.alexThompsonArchitectPortrait
    },
    {
      name: "Maya Patel",
      role: "Client Relations Manager",
      bio: "Project coordinator ensuring smooth communication and delivery, dedicated to exceeding client expectations on every project.",
      skills: ["Project Management", "Client Communication", "Quality Assurance", "Team Coordination"],
      image: images.team.mayaPatelCoordinatorPhoto
    }
  ];

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