
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
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactEmailRequest = await req.json();

    // Send email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "ChoreChart Contact <contact@resend.dev>",
      to: ["admin@chorechart.com"], // Replace with your admin email
      subject: `New Contact Form: ${subject}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
          </div>
          <div style="padding: 40px 20px; background: #f8fafc;">
            <h2 style="color: #1e293b; margin-bottom: 20px;">Contact Details</h2>
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
            </div>
            <h3 style="color: #1e293b; margin-bottom: 15px;">Message:</h3>
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
              <p style="color: #475569; line-height: 1.6; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          <div style="padding: 20px; text-align: center; color: #94a3b8; font-size: 12px;">
            © 2024 ChoreChart. Contact form submission.
          </div>
        </div>
      `,
    });

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "ChoreChart Support <support@resend.dev>",
      to: [email],
      subject: "Thanks for contacting ChoreChart!",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Thank You!</h1>
          </div>
          <div style="padding: 40px 20px; background: #f8fafc;">
            <h2 style="color: #1e293b; margin-bottom: 20px;">We received your message</h2>
            <p style="color: #475569; line-height: 1.6; margin-bottom: 30px;">
              Hi ${name},
            </p>
            <p style="color: #475569; line-height: 1.6; margin-bottom: 30px;">
              Thank you for reaching out to us! We've received your message about "${subject}" and our team will review it carefully.
            </p>
            <p style="color: #475569; line-height: 1.6; margin-bottom: 30px;">
              We typically respond within 24 hours during business days. If your inquiry is urgent, please don't hesitate to call us directly.
            </p>
            <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <h3 style="color: #1e293b; margin-bottom: 15px;">Your Message:</h3>
              <p style="color: #475569; line-height: 1.6; margin: 0; font-style: italic;">"${message}"</p>
            </div>
            <p style="color: #64748b; font-size: 14px; line-height: 1.6;">
              Best regards,<br>
              The ChoreChart Support Team
            </p>
          </div>
          <div style="padding: 20px; text-align: center; color: #94a3b8; font-size: 12px;">
            © 2024 ChoreChart. All rights reserved.
          </div>
        </div>
      `,
    });

    console.log("Contact emails sent successfully:", { adminEmailResponse, userEmailResponse });

    return new Response(JSON.stringify({ 
      success: true,
      adminEmail: adminEmailResponse,
      userEmail: userEmailResponse 
    }), {
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
