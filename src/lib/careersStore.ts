// Shared mock careers store used by both Admin and front-end
// This will be replaced by Supabase when backend is connected

export interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary_range: string;
  description: string;
  requirements: string[];
  is_active: boolean;
  created_at: string;
}

const baseTime = Date.now();
const mk = (i: number) => new Date(baseTime - i * 86400000).toISOString();

const defaultJobs: JobListing[] = [
  { id: '1', title: 'Social Media Marketing Intern', department: 'Marketing', location: 'Remote', type: 'Part-time', salary_range: 'Unpaid Internship (College Credit Available)', description: 'Assist with social media strategy and content creation across platforms.', requirements: ['Currently enrolled in college', 'Social media savvy', 'Strong writing skills'], is_active: true, created_at: mk(0) },
  { id: '2', title: 'Artist Management Intern', department: 'Management', location: 'Hybrid', type: 'Part-time', salary_range: 'Unpaid Internship', description: 'Support artist management operations and client relations.', requirements: ['Interest in music industry', 'Organized', 'Strong communication'], is_active: true, created_at: mk(1) },
  { id: '3', title: 'A&R Scout Intern', department: 'A&R', location: 'Remote', type: 'Part-time', salary_range: 'Unpaid Internship', description: 'Discover and evaluate emerging talent for the roster.', requirements: ['Music knowledge', 'Trend awareness', 'Analytical skills'], is_active: true, created_at: mk(2) },
  { id: '4', title: 'Graphic Design / Content Intern', department: 'Creative', location: 'Remote', type: 'Part-time', salary_range: 'Unpaid Internship', description: 'Create visual content and graphics for marketing campaigns.', requirements: ['Adobe Creative Suite', 'Portfolio required', 'Design eye'], is_active: true, created_at: mk(3) },
  { id: '5', title: 'Talent Manager', department: 'Management', location: 'Hybrid', type: 'Full-time', salary_range: 'Commission Only (% of Client Earnings)', description: 'Manage talent relationships, bookings, and career development.', requirements: ['Industry experience', 'Negotiation skills', 'Network'], is_active: true, created_at: mk(4) },
  { id: '6', title: 'Booking Agent', department: 'Bookings', location: 'Remote', type: 'Contract', salary_range: 'Commission Based (Per Booking)', description: 'Secure performance bookings and event opportunities for roster talent.', requirements: ['Sales experience', 'Music industry contacts', 'Self-motivated'], is_active: true, created_at: mk(5) },
  { id: '7', title: 'Brand Partnership Specialist', department: 'Partnerships', location: 'Remote', type: 'Contract', salary_range: 'Commission on Sponsorship Deals', description: 'Develop and close brand partnership and sponsorship deals.', requirements: ['Sales/BD experience', 'Brand marketing knowledge', 'Negotiation'], is_active: true, created_at: mk(6) },
  { id: '8', title: 'Sales Representative', department: 'Sales', location: 'Remote', type: 'Contract', salary_range: '100% Commission', description: 'Drive revenue through outbound sales of services and packages.', requirements: ['Proven sales track record', 'Self-starter', 'CRM experience'], is_active: true, created_at: mk(7) },
];

type Listener = () => void;

let jobs: JobListing[] = [...defaultJobs];
let cachedActiveJobs: JobListing[] = jobs.filter(j => j.is_active);
const listeners: Set<Listener> = new Set();

function notify() {
  cachedActiveJobs = jobs.filter(j => j.is_active);
  listeners.forEach(fn => fn());
}

export const careersStore = {
  getJobs: () => jobs,
  getActiveJobs: () => cachedActiveJobs,

  setJobs: (next: JobListing[]) => { jobs = next; notify(); },
  addJob: (job: Omit<JobListing, 'id' | 'created_at'> & { created_at?: string }) => {
    jobs = [...jobs, { id: Date.now().toString(), created_at: new Date().toISOString(), ...job }];
    notify();
  },
  updateJob: (id: string, updates: Partial<JobListing>) => {
    jobs = jobs.map(j => j.id === id ? { ...j, ...updates } : j);
    notify();
  },
  deleteJob: (id: string) => {
    jobs = jobs.filter(j => j.id !== id);
    notify();
  },
  toggleActive: (id: string) => {
    jobs = jobs.map(j => j.id === id ? { ...j, is_active: !j.is_active } : j);
    notify();
  },

  subscribe: (fn: Listener) => {
    listeners.add(fn);
    return () => { listeners.delete(fn); };
  },
};
