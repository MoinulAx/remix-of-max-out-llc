import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  service: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, service, message }: ContactEmailRequest = await req.json();

    const serviceDescription = {
      'web-development': 'Web Development Services',
      'photography': 'Professional Photography Services',
      'consulting': 'Creative Consulting Services',
      'other': 'Custom Creative Solutions'
    }[service] || 'Our Creative Services';

    const emailResponse = await resend.emails.send({
      from: "RummSpace <onboarding@resend.dev>",
      to: [email],
      subject: `Thank you for contacting RummSpace about ${serviceDescription}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1a1a1a; margin-bottom: 10px; font-size: 28px;">Thank you for reaching out!</h1>
            <p style="color: #666; font-size: 16px;">We truly value your interest in our creative services</p>
          </div>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">Dear ${name},</p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">We have received your inquiry about our <strong>${serviceDescription}</strong>. You are a valued potential client, and we're excited to learn about your creative vision!</p>
          
          <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #007bff;">
            <h3 style="margin-top: 0; color: #1a1a1a; font-size: 20px;">Your Message:</h3>
            <p style="color: #555; font-style: italic; margin: 0; line-height: 1.6;">"${message}"</p>
          </div>
          
          <div style="background-color: #e8f4fd; padding: 25px; border-radius: 8px; margin: 25px 0;">
            <h3 style="margin-top: 0; color: #1a1a1a; font-size: 20px;">What happens next?</h3>
            <ul style="margin: 0; padding-left: 20px; color: #333; line-height: 1.8;">
              <li>We'll review your project details within 24 hours</li>
              <li>Our creative team will prepare a personalized response</li>
              <li>We'll reach out to discuss your vision and next steps</li>
              <li>Together, we'll bring your creative ideas to life</li>
            </ul>
          </div>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">At RummSpace, we specialize in creating amazing experiences through media, web development, and creative vision. Your project deserves our full attention and expertise.</p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">Thank you for choosing RummSpace for your creative needs. We can't wait to work with you!</p>
          
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

    console.log("Contact confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
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