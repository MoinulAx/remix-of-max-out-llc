import React, { useSyncExternalStore, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { careersStore } from '@/lib/careersStore';
import ApplicationModal from '@/components/ApplicationModal';
import { ArrowLeft, Briefcase, Building, MapPin, Clock, DollarSign, CheckCircle2, Mail } from 'lucide-react';

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const activeJobs = useSyncExternalStore(careersStore.subscribe, careersStore.getActiveJobs);
  const job = activeJobs.find(j => j.id === id);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 md:px-6 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Position Not Found</h1>
          <p className="text-muted-foreground mb-8">
            This role may have been filled or is no longer available.
          </p>
          <Button onClick={() => navigate('/careers')}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Careers
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <FadeIn>
              <Link
                to="/careers"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> All Open Positions
              </Link>

              <Badge variant="secondary" className="mb-4">{job.department}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{job.title}</h1>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {job.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" /> {job.type}
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" /> {job.department}
                </div>
                {job.salary_range && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" /> {job.salary_range}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" onClick={() => setIsApplyOpen(true)}>
                  <Briefcase className="h-4 w-4 mr-2" /> Apply for this Role
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/inquire">
                    <Mail className="h-4 w-4 mr-2" /> General Inquiry
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl space-y-10">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">About the Role</h2>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </FadeIn>

            {job.requirements && job.requirements.length > 0 && (
              <FadeIn delay={100}>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            )}

            <FadeIn delay={200}>
              <Card className="bg-muted/30 border-primary/20">
                <CardContent className="py-8 text-center">
                  <h3 className="text-xl font-bold mb-3">Ready to join the team?</h3>
                  <p className="text-muted-foreground mb-6">
                    Submit your application and we'll be in touch soon.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={() => setIsApplyOpen(true)}>
                      <Briefcase className="h-4 w-4 mr-2" /> Apply Now
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/inquire">Contact Us Instead</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />

      <ApplicationModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        jobTitle={job.title}
        jobType={job.type}
        jobLocation={job.location}
      />
    </div>
  );
};

export default JobDetail;
