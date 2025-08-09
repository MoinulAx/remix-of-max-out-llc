import emailjs from '@emailjs/browser';
import { supabase } from '@/integrations/supabase/client';

// EmailJS Configuration - Update these with your actual IDs from EmailJS dashboard
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your service ID from EmailJS dashboard
const EMAILJS_CONTACT_TEMPLATE = 'YOUR_CONTACT_TEMPLATE_ID'; // Replace with your contact template ID  
const EMAILJS_QUOTE_TEMPLATE = 'YOUR_QUOTE_TEMPLATE_ID'; // Replace with your quote template ID
const EMAILJS_APPLICATION_TEMPLATE = 'YOUR_APPLICATION_TEMPLATE_ID'; // Replace with your application template ID
const EMAILJS_PUBLIC_KEY = 'An42SLd7uHrb9AN-r';

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
        service: formData.service,
        budget: formData.budget || '',
        timeline: formData.timeline || '',
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
        service_type: formData.serviceType,
        budget_range: formData.budgetRange || '',
        project_timeline: formData.projectTimeline || '',
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
        job_title: formData.jobTitle,
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