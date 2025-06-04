
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AuthEmailRequest {
  email: string;
  type: 'signup' | 'recovery' | 'magic_link';
  token?: string;
  redirect_to?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, type, token, redirect_to }: AuthEmailRequest = await req.json();

    let subject = "";
    let html = "";

    switch (type) {
      case 'signup':
        subject = "Welcome to ChoreChart - Confirm your email";
        html = `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to ChoreChart!</h1>
            </div>
            <div style="padding: 40px 20px; background: #f8fafc;">
              <h2 style="color: #1e293b; margin-bottom: 20px;">Confirm your email address</h2>
              <p style="color: #475569; line-height: 1.6; margin-bottom: 30px;">
                Thanks for signing up! Please confirm your email address by clicking the button below:
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${redirect_to || 'https://your-app.com'}" 
                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                          color: white; 
                          padding: 15px 30px; 
                          text-decoration: none; 
                          border-radius: 8px; 
                          display: inline-block; 
                          font-weight: bold;">
                  Confirm Email Address
                </a>
              </div>
              <p style="color: #64748b; font-size: 14px; line-height: 1.6;">
                If you didn't create an account with ChoreChart, you can safely ignore this email.
              </p>
            </div>
            <div style="padding: 20px; text-align: center; color: #94a3b8; font-size: 12px;">
              © 2024 ChoreChart. All rights reserved.
            </div>
          </div>
        `;
        break;

      case 'recovery':
        subject = "Reset your ChoreChart password";
        html = `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Password Reset</h1>
            </div>
            <div style="padding: 40px 20px; background: #f8fafc;">
              <h2 style="color: #1e293b; margin-bottom: 20px;">Reset your password</h2>
              <p style="color: #475569; line-height: 1.6; margin-bottom: 30px;">
                We received a request to reset your password. Click the button below to create a new password:
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${redirect_to || 'https://your-app.com'}" 
                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                          color: white; 
                          padding: 15px 30px; 
                          text-decoration: none; 
                          border-radius: 8px; 
                          display: inline-block; 
                          font-weight: bold;">
                  Reset Password
                </a>
              </div>
              <p style="color: #64748b; font-size: 14px; line-height: 1.6;">
                If you didn't request this password reset, you can safely ignore this email.
              </p>
            </div>
            <div style="padding: 20px; text-align: center; color: #94a3b8; font-size: 12px;">
              © 2024 ChoreChart. All rights reserved.
            </div>
          </div>
        `;
        break;

      case 'magic_link':
        subject = "Your ChoreChart magic link";
        html = `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Magic Link Login</h1>
            </div>
            <div style="padding: 40px 20px; background: #f8fafc;">
              <h2 style="color: #1e293b; margin-bottom: 20px;">Sign in to ChoreChart</h2>
              <p style="color: #475569; line-height: 1.6; margin-bottom: 30px;">
                Click the button below to sign in to your account:
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${redirect_to || 'https://your-app.com'}" 
                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                          color: white; 
                          padding: 15px 30px; 
                          text-decoration: none; 
                          border-radius: 8px; 
                          display: inline-block; 
                          font-weight: bold;">
                  Sign In
                </a>
              </div>
              <p style="color: #64748b; font-size: 14px; line-height: 1.6;">
                This link will expire in 24 hours. If you didn't request this, you can safely ignore this email.
              </p>
            </div>
            <div style="padding: 20px; text-align: center; color: #94a3b8; font-size: 12px;">
              © 2024 ChoreChart. All rights reserved.
            </div>
          </div>
        `;
        break;
    }

    const emailResponse = await resend.emails.send({
      from: "ChoreChart <onboarding@resend.dev>",
      to: [email],
      subject: subject,
      html: html,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-auth-email function:", error);
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
