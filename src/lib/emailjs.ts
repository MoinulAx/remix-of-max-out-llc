import emailjs from '@emailjs/browser';
import { supabase } from '@/integrations/supabase/client';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_CONTACT_TEMPLATE = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE;
const EMAILJS_QUOTE_TEMPLATE = import.meta.env.VITE_EMAILJS_QUOTE_TEMPLATE;
const EMAILJS_APPLICATION_TEMPLATE = import.meta.env.VITE_EMAILJS_APPLICATION_TEMPLATE;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Email sending via EmailJS with Supabase Edge Functions as fallback

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
  try {
    // Try EmailJS first
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_CONTACT_TEMPLATE,
      {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || '',
        service: formData.service ? `Service Requested: ${formData.service}` : '',
        budget_range: formData.budget ? `Budget Range: ${formData.budget}` : '',
        project_timeline: formData.timeline ? `Project Timeline: ${formData.timeline}` : '',
        message: formData.message,
      }
    );
    return { success: true, provider: 'emailjs' };
  } catch (emailjsError) {
    console.warn('EmailJS failed, trying Supabase fallback:', emailjsError);
    
    // Fallback to Supabase Edge Functions
    const { data, error } = await supabase.functions.invoke('send-contact-email', {
      body: {
        name: formData.name,
        email: formData.email,
        service: formData.service,
        message: formData.message,
      },
    });

    if (error) {
      console.error('Both EmailJS and Edge Function failed:', error);
      throw error;
    }
    return { ...data, provider: 'supabase' };
  }
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
  try {
    // Try EmailJS first
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_QUOTE_TEMPLATE,
      {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || '',
        service: formData.serviceType ? `Service Requested: ${formData.serviceType}` : '',
        budget_range: formData.budgetRange ? `Budget Range: ${formData.budgetRange}` : '',
        project_timeline: formData.projectTimeline ? `Project Timeline: ${formData.projectTimeline}` : '',
        message: formData.message || '',
      }
    );
    return { success: true, provider: 'emailjs' };
  } catch (emailjsError) {
    console.warn('EmailJS failed, trying Supabase fallback:', emailjsError);
    
    // Fallback to Supabase Edge Functions
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
      console.error('Both EmailJS and Edge Function failed:', error);
      throw error;
    }
    return { ...data, provider: 'supabase' };
  }
};

// Application email service
export const sendApplicationEmail = async (formData: {
  name: string;
  email: string;
  jobTitle: string;
}) => {
  try {
    // Try EmailJS first
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_APPLICATION_TEMPLATE,
      {
        from_name: formData.name,
        from_email: formData.email,
        service_type: formData.jobTitle,
      }
    );
    return { success: true, provider: 'emailjs' };
  } catch (emailjsError) {
    console.warn('EmailJS failed, trying Supabase fallback:', emailjsError);
    
    // Fallback to Supabase Edge Functions
    const { data, error } = await supabase.functions.invoke('send-application-email', {
      body: {
        name: formData.name,
        email: formData.email,
        jobTitle: formData.jobTitle,
      },
    });

    if (error) {
      console.error('Both EmailJS and Edge Function failed:', error);
      throw error;
    }
    return { ...data, provider: 'supabase' };
  }
};