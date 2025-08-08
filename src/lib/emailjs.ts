import emailjs from '@emailjs/browser';

// EmailJS Configuration
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'An42SLd7uHrb9AN-r', // Public key provided by user
  SERVICE_ID: 'YOUR_SERVICE_ID', // Replace with your Gmail service ID
  TEMPLATES: {
    CONTACT: 'YOUR_CONTACT_TEMPLATE_ID', // Replace with your contact template ID
    QUOTE: 'YOUR_QUOTE_TEMPLATE_ID', // Replace with your quote template ID
    APPLICATION: 'YOUR_APPLICATION_TEMPLATE_ID' // Replace with your application template ID
  }
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

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
  const templateParams = {
    to_name: formData.name,
    to_email: formData.email,
    from_name: 'RummSpace',
    from_email: 'rummspace@gmail.com',
    client_name: formData.name,
    client_email: formData.email,
    client_phone: formData.phone || 'Not provided',
    service_type: formData.service,
    budget_range: formData.budget || 'Not specified',
    project_timeline: formData.timeline || 'Not specified',
    project_details: formData.message,
    reply_to: 'rummspace@gmail.com'
  };

  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATES.CONTACT,
      templateParams
    );
    return response;
  } catch (error) {
    console.error('EmailJS Contact Error:', error);
    throw error;
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
  const templateParams = {
    to_name: formData.name,
    to_email: formData.email,
    from_name: 'RummSpace',
    from_email: 'rummspace@gmail.com',
    client_name: formData.name,
    client_email: formData.email,
    client_phone: formData.phone || 'Not provided',
    service_type: formData.serviceType,
    budget_range: formData.budgetRange || 'Not specified',
    project_timeline: formData.projectTimeline || 'Not specified',
    project_details: formData.message || 'No additional details provided',
    reply_to: 'rummspace@gmail.com'
  };

  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATES.QUOTE,
      templateParams
    );
    return response;
  } catch (error) {
    console.error('EmailJS Quote Error:', error);
    throw error;
  }
};

// Application email service
export const sendApplicationEmail = async (formData: {
  name: string;
  email: string;
  jobTitle: string;
}) => {
  const templateParams = {
    to_name: formData.name,
    to_email: formData.email,
    from_name: 'RummSpace',
    from_email: 'rummspace@gmail.com',
    applicant_name: formData.name,
    applicant_email: formData.email,
    job_title: formData.jobTitle,
    reply_to: 'rummspace@gmail.com'
  };

  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATES.APPLICATION,
      templateParams
    );
    return response;
  } catch (error) {
    console.error('EmailJS Application Error:', error);
    throw error;
  }
};