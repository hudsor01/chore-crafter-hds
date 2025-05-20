
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, chartData } = await req.json();

    // For now, we'll just simulate sending an email
    // In a real implementation, you would use a service like Resend
    // Add Resend API key to your Supabase secrets:
    // const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    console.log(`Sending email to ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Chart data:`, JSON.stringify(chartData));

    // Mock response for now
    return new Response(
      JSON.stringify({ 
        success: true,
        message: `Email would be sent to ${to}` 
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
