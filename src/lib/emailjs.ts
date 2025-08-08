import { supabase } from '@/integrations/supabase/client';

// Email sending via Supabase Edge Functions (Resend)
// Keeps the same function names used across the app, but routes through secure backend functions.

// Contact form email service
export const sendContactEmail = async (formData: {
  name: string;
  email: string;
  phone?: string;
  service: string;
  budget?: string;
  timeline?: string;
  message: string;
}) => {
  const { data, error } = await supabase.functions.invoke('send-contact-email', {
    body: {
      name: formData.name,
      email: formData.email,
      service: formData.service,
      message: formData.message,
    },
  });

  if (error) {
    console.error('Edge Function Contact Error:', error);
    throw error;
  }
  return data;
};

// Quote request email service
export const sendQuoteEmail = async (formData: {
  name: string;
  email: string;
  phone?: string;
  serviceType: string;
  budgetRange?: string;
  projectTimeline?: string;
  message?: string;
}) => {
  const { data, error } = await supabase.functions.invoke('send-quote-email', {
    body: {
      name: formData.name,
      email: formData.email,
      serviceType: formData.serviceType,
      budgetRange: formData.budgetRange,
      projectTimeline: formData.projectTimeline,
      message: formData.message,
    },
  });

  if (error) {
    console.error('Edge Function Quote Error:', error);
    throw error;
  }
  return data;
};

// Application email service
export const sendApplicationEmail = async (formData: {
  name: string;
  email: string;
  jobTitle: string;
}) => {
  const { data, error } = await supabase.functions.invoke('send-application-email', {
    body: {
      name: formData.name,
      email: formData.email,
      jobTitle: formData.jobTitle,
    },
  });

  if (error) {
    console.error('Edge Function Application Error:', error);
    throw error;
  }
  return data;
};