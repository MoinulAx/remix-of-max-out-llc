import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ApplicationEmailRequest {
  name: string;
  email: string;
  jobTitle: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, jobTitle }: ApplicationEmailRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "RummSpace <rummspace@gmail.com>",
      to: [email],
      subject: `Thank you for applying to ${jobTitle}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; margin-bottom: 20px;">Thank you for your application!</h1>
          
          <p>Dear ${name},</p>
          
          <p>We have received your application for the <strong>${jobTitle}</strong> position at RummSpace. We truly appreciate your interest in joining our creative team.</p>
          
          <p>You are a valued potential team member, and we want you to know that every application receives careful consideration from our hiring team.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">What happens next?</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>We'll review your application within 3-5 business days</li>
              <li>If your background aligns with our needs, we'll reach out to schedule an interview</li>
              <li>Our hiring process typically includes 2-3 conversations with our team</li>
              <li>We'll keep you updated throughout the entire process</li>
            </ul>
          </div>
          
          <p>In the meantime, feel free to explore our work and company culture on our website. We believe in creating amazing experiences through media, web development, and creative vision.</p>
          
          <p>Thank you again for considering RummSpace as your next career destination. We're excited to learn more about you!</p>
          
           <p>Best regards,<br>
           The RummSpace Team<br>
           <a href="mailto:rummspace@gmail.com">rummspace@gmail.com</a></p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 12px; color: #666; text-align: center;">
            RummSpace - Media. Web. Vision by Rummy.<br>
            New York City, NY
          </p>
        </div>
      `,
    });

    console.log("Application confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-application-email function:", error);
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