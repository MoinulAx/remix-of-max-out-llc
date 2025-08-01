import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface ServicesProps {
  className?: string;
}

const Services: React.FC<ServicesProps> = ({ className }) => {
  const services = [
    {
      title: "Web Development",
      description: "Full-stack web applications with modern technologies",
      features: ["React/Next.js", "Node.js Backend", "Database Design", "Responsive Design"],
      price: "Starting at $2,500"
    },
    {
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications",
      features: ["iOS & Android", "React Native", "API Integration", "App Store Deployment"],
      price: "Starting at $3,500"
    },
    {
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interface designs",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      price: "Starting at $1,500"
    },
    {
      title: "E-commerce Solutions",
      description: "Complete online store development and optimization",
      features: ["Shopify/WooCommerce", "Payment Integration", "Inventory Management", "SEO Optimization"],
      price: "Starting at $4,000"
    },
    {
      title: "Digital Marketing",
      description: "Comprehensive digital marketing strategies",
      features: ["SEO/SEM", "Social Media", "Content Strategy", "Analytics"],
      price: "Starting at $1,200/month"
    },
    {
      title: "Brand Identity",
      description: "Complete brand identity and visual design packages",
      features: ["Logo Design", "Brand Guidelines", "Marketing Materials", "Website Graphics"],
      price: "Starting at $2,000"
    }
  ];

  return (
    <section id="services" className={cn('py-20 md:py-32 bg-gradient-to-br from-background to-secondary/30', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Service Packages
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional digital solutions tailored to elevate your business to the next level
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <FadeIn key={service.title} delay={100 + (index * 50)}>
              <Card className="h-full transition-all duration-300 hover:shadow-[var(--shadow-sharp)] hover:-translate-y-1 border-0 shadow-[var(--shadow-card)] bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-foreground">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-none flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold text-primary text-lg">{service.price}</p>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;