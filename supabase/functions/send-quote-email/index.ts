import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuoteEmailRequest {
  name: string;
  email: string;
  serviceType: string;
  budgetRange?: string;
  projectTimeline?: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, serviceType, budgetRange, projectTimeline, message }: QuoteEmailRequest = await req.json();

    const serviceDescription = {
      'web-development': 'Web Development',
      'photography': 'Professional Photography',
      'consulting': 'Creative Consulting',
      'design': 'Creative Design',
      'other': 'Custom Creative Services'
    }[serviceType] || 'Creative Services';

    const emailResponse = await resend.emails.send({
      from: "RummSpace <onboarding@resend.dev>",
      to: [email],
      subject: `Your ${serviceDescription} Quote Request - We Value Your Vision!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1a1a1a; margin-bottom: 10px; font-size: 28px;">Thank you for your quote request!</h1>
            <p style="color: #666; font-size: 16px;">You are a valued potential client - let's create something amazing together</p>
          </div>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">Dear ${name},</p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">We have received your quote request for our <strong>${serviceDescription}</strong> services. Your creative project matters to us, and we're thrilled to be considered for bringing your vision to life!</p>
          
          <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #28a745;">
            <h3 style="margin-top: 0; color: #1a1a1a; font-size: 20px;">Your Project Details:</h3>
            <ul style="margin: 10px 0; padding-left: 20px; color: #555; line-height: 1.6;">
              <li><strong>Service:</strong> ${serviceDescription}</li>
              ${budgetRange ? `<li><strong>Budget Range:</strong> ${budgetRange}</li>` : ''}
              ${projectTimeline ? `<li><strong>Timeline:</strong> ${projectTimeline}</li>` : ''}
              ${message ? `<li><strong>Details:</strong> ${message}</li>` : ''}
            </ul>
          </div>
          
          <div style="background-color: #e8f4fd; padding: 25px; border-radius: 8px; margin: 25px 0;">
            <h3 style="margin-top: 0; color: #1a1a1a; font-size: 20px;">What happens next?</h3>
            <ul style="margin: 0; padding-left: 20px; color: #333; line-height: 1.8;">
              <li>Our expert team will review your project requirements</li>
              <li>We'll prepare a detailed, customized quote within 24-48 hours</li>
              <li>You'll receive a comprehensive proposal with project timeline</li>
              <li>We'll schedule a call to discuss your vision and answer questions</li>
              <li>Together, we'll create something extraordinary</li>
            </ul>
          </div>
          
          <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #ffeaa7;">
            <h4 style="margin-top: 0; color: #1a1a1a; font-size: 18px;">💡 Why Choose RummSpace?</h4>
            <p style="color: #333; margin: 0; line-height: 1.6;">We don't just deliver projects - we create experiences. Our team combines technical expertise with creative vision to ensure your project stands out and achieves your goals.</p>
          </div>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">Thank you for considering RummSpace for your creative needs. We're committed to delivering exceptional results that exceed your expectations!</p>
          
          <div style="margin-top: 40px; padding-top: 30px; border-top: 2px solid #eee;">
            <p style="color: #333; font-size: 16px; margin-bottom: 10px;">
              Best regards,<br>
              <strong>The RummSpace Creative Team</strong><br>
              <a href="mailto:rummspace@gmail.com" style="color: #007bff; text-decoration: none;">rummspace@gmail.com</a>
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 12px; color: #666; text-align: center; margin: 0;">
            <strong>RummSpace</strong> - Media. Web. Vision by Rummy.<br>
            New York City, NY
          </p>
        </div>
      `,
    });

    console.log("Quote confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-quote-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);