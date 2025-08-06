import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Briefcase, MapPin, Clock, DollarSign, Users, Building } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  salary_range: string;
}

const Careers = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cover_letter: '',
    portfolio_url: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setIsDialogOpen(true);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedJob) return;

    try {
      const { error } = await supabase
        .from('job_applications')
        .insert({
          job_id: selectedJob.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          cover_letter: formData.cover_letter,
          portfolio_url: formData.portfolio_url,
        });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you soon.",
      });

      setIsDialogOpen(false);
      setFormData({ name: '', email: '', phone: '', cover_letter: '', portfolio_url: '' });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time':
        return 'bg-primary text-primary-foreground';
      case 'Part-time':
        return 'bg-secondary text-secondary-foreground';
      case 'Contract':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 md:px-6">
            <FadeIn className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Join Our Creative Team
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                We're building the future of creative services. Join us and help bring amazing 
                projects to life while working with cutting-edge technology and passionate people.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Remote-First Culture</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Growth Opportunities</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Competitive Benefits</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Open Positions</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Find your next opportunity and join our growing team of creative professionals.
              </p>
            </FadeIn>

            <FadeIn delay={150} className="max-w-6xl mx-auto">
              {jobs.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-lg text-muted-foreground">
                      No open positions at the moment. Check back soon or send us your resume!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 md:gap-8">
                  {jobs.map((job, index) => (
                    <FadeIn key={job.id} delay={200 + index * 50}>
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex-1">
                              <CardTitle className="text-xl md:text-2xl mb-2">{job.title}</CardTitle>
                              <CardDescription className="text-base mb-4">{job.description}</CardDescription>
                              
                              <div className="flex flex-wrap gap-3 mb-4">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Building className="h-4 w-4" />
                                  {job.department}
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <MapPin className="h-4 w-4" />
                                  {job.location}
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  <Badge variant="secondary" className={getTypeColor(job.type)}>
                                    {job.type}
                                  </Badge>
                                </div>
                                {job.salary_range && (
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <DollarSign className="h-4 w-4" />
                                    {job.salary_range}
                                  </div>
                                )}
                              </div>

                              {job.requirements && job.requirements.length > 0 && (
                                <div className="mb-4">
                                  <h4 className="font-semibold mb-2 text-sm">Requirements:</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {job.requirements.slice(0, 3).map((req, i) => (
                                      <Badge key={i} variant="outline" className="text-xs">
                                        {req}
                                      </Badge>
                                    ))}
                                    {job.requirements.length > 3 && (
                                      <Badge variant="outline" className="text-xs">
                                        +{job.requirements.length - 3} more
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-shrink-0">
                              <Button 
                                onClick={() => handleApply(job)}
                                className="w-full md:w-auto"
                              >
                                <Briefcase className="h-4 w-4 mr-2" />
                                Apply Now
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    </FadeIn>
                  ))}
                </div>
              )}

              {/* General Application CTA */}
              <FadeIn delay={400} className="text-center mt-16">
                <Card className="max-w-2xl mx-auto">
                  <CardContent className="py-8">
                    <h3 className="text-xl font-bold mb-4">Don't see the right fit?</h3>
                    <p className="text-muted-foreground mb-6">
                      We're always looking for talented individuals to join our team. 
                      Send us your resume and we'll keep you in mind for future opportunities.
                    </p>
                    <Button variant="outline">
                      Send General Application
                    </Button>
                  </CardContent>
                </Card>
              </FadeIn>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* Application Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
            <DialogDescription>
              Fill out the form below to submit your application for this position.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitApplication} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="portfolio">Portfolio URL</Label>
              <Input
                id="portfolio"
                type="url"
                placeholder="https://your-portfolio.com"
                value={formData.portfolio_url}
                onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="cover_letter">Cover Letter *</Label>
              <Textarea
                id="cover_letter"
                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                value={formData.cover_letter}
                onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                rows={6}
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button type="submit" className="flex-1">
                Submit Application
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Careers;