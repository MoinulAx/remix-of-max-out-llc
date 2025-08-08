import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import FadeIn from '@/components/animations/FadeIn';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundImage from '@/components/BackgroundImage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  const [activeSection, setActiveSection] = useState('story');

  const sections = [
    { id: 'story', label: 'Our Story' },
    { id: 'mission', label: 'Mission' },
    { id: 'process', label: 'Process' },
    { id: 'tools', label: 'Tools & Tech' }
  ];

  const tools = {
    photography: [
      { name: "Canon R5", category: "Camera" },
      { name: "Sony A7IV", category: "Camera" },
      { name: "Fujifilm X-T5", category: "Camera" },
      { name: "Adobe Lightroom", category: "Editing" },
      { name: "Adobe Photoshop", category: "Editing" },
      { name: "Capture One", category: "Editing" }
    ],
    video: [
      { name: "Final Cut Pro", category: "Editing" },
      { name: "DaVinci Resolve", category: "Editing" },
      { name: "Adobe Premiere", category: "Editing" },
      { name: "Motion Graphics", category: "Animation" }
    ],
    web: [
      { name: "React", category: "Frontend" },
      { name: "Next.js", category: "Framework" },
      { name: "Node.js", category: "Backend" },
      { name: "TypeScript", category: "Language" },
      { name: "Tailwind CSS", category: "Styling" },
      { name: "Figma", category: "Design" }
    ]
  };

  const process = [
    {
      step: "01",
      title: "Discovery & Consultation",
      description: "We start with a detailed conversation about your vision, goals, and requirements. Understanding your brand and audience is crucial for creating impactful work."
    },
    {
      step: "02",
      title: "Planning & Strategy",
      description: "Based on our consultation, we develop a comprehensive plan including timelines, deliverables, and creative direction that aligns with your objectives."
    },
    {
      step: "03",
      title: "Creation & Development",
      description: "This is where the magic happens. Whether it's a photoshoot, video production, or web development, we execute with precision and creativity."
    },
    {
      step: "04",
      title: "Review & Refinement",
      description: "We present our work and collaborate with you on any refinements needed. Your feedback is essential to achieving the perfect result."
    },
    {
      step: "05",
      title: "Delivery & Support",
      description: "Final deliverables are provided in all required formats, along with ongoing support to ensure everything works perfectly for your needs."
    }
  ];

  return (
    <main className="relative">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-24 pb-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              About RummSpace
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Where creativity meets technology to bring your vision to life
            </p>
          </FadeIn>

          {/* Section Navigation */}
          <FadeIn delay={100} className="flex justify-center mb-16">
            <div className="flex flex-wrap justify-center bg-card shadow-[var(--shadow-card)] p-1 gap-1 mx-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "px-3 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap",
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground shadow-[var(--shadow-sharp)]"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Our Story */}
          {activeSection === 'story' && (
            <FadeIn className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">The RummSpace Story</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      RummSpace was born from a passion for storytelling through multiple mediums. Founded by Rummy, a creative professional with expertise spanning photography, videography, and web development, the studio represents the convergence of artistic vision and technical innovation.
                    </p>
                    <p>
                      What started as a personal journey to capture moments and build digital experiences has evolved into a comprehensive creative studio serving clients who value quality, authenticity, and innovation.
                    </p>
                    <p>
                      Today, RummSpace stands as a testament to the power of combining traditional creative skills with modern technology, creating work that not only looks beautiful but performs exceptionally in the digital landscape.
                    </p>
                  </div>
                </div>
                <div className="relative h-64 md:h-96 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                  <img 
                    src="/lovable-uploads/34a58283-8b82-48f9-88f4-2c88b069921d.png" 
                    alt="Rummy at work"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </FadeIn>
          )}

          {/* Mission */}
          {activeSection === 'mission' && (
            <FadeIn className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-card shadow-[var(--shadow-card)]">
                  <CardHeader>
                    <CardTitle className="text-xl">Visual Storytelling</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We believe every brand, person, and moment has a unique story worth telling through compelling visuals.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card shadow-[var(--shadow-card)]">
                  <CardHeader>
                    <CardTitle className="text-xl">Digital Excellence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Creating web experiences that are not just beautiful, but functional, fast, and user-focused.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card shadow-[var(--shadow-card)]">
                  <CardHeader>
                    <CardTitle className="text-xl">Authentic Connection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Building genuine relationships with clients to understand and amplify their authentic voice.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>
          )}

          {/* Process */}
          {activeSection === 'process' && (
            <FadeIn className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Creative Process</h2>
              <div className="space-y-8">
                {process.map((item, index) => (
                  <FadeIn key={item.step} delay={index * 100}>
                    <div className="flex gap-6 items-start">
                      <div className="flex-shrink-0 w-16 h-16 bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center shadow-[var(--shadow-sharp)]">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>
          )}

          {/* Tools & Tech */}
          {activeSection === 'tools' && (
            <FadeIn className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Tools & Technology</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-card shadow-[var(--shadow-card)]">
                  <CardHeader>
                    <CardTitle className="text-xl">Photography</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {tools.photography.map((tool, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="font-medium">{tool.name}</span>
                          <span className="text-sm text-muted-foreground">{tool.category}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card shadow-[var(--shadow-card)]">
                  <CardHeader>
                    <CardTitle className="text-xl">Video Production</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {tools.video.map((tool, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="font-medium">{tool.name}</span>
                          <span className="text-sm text-muted-foreground">{tool.category}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card shadow-[var(--shadow-card)]">
                  <CardHeader>
                    <CardTitle className="text-xl">Web Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {tools.web.map((tool, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="font-medium">{tool.name}</span>
                          <span className="text-sm text-muted-foreground">{tool.category}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default About;