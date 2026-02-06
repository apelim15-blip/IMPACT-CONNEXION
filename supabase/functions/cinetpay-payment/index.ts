import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const CINETPAY_API_KEY = Deno.env.get("CINETPAY_API_KEY");
    const CINETPAY_SITE_ID = Deno.env.get("CINETPAY_SITE_ID");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!CINETPAY_API_KEY) throw new Error("CINETPAY_API_KEY is not configured");
    if (!CINETPAY_SITE_ID) throw new Error("CINETPAY_SITE_ID is not configured");
    if (!SUPABASE_URL) throw new Error("SUPABASE_URL is not configured");
    if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured");

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    if (action === "notify") {
      // CinetPay webhook notification
      const body = await req.json();
      console.log("CinetPay notification received:", JSON.stringify(body));

      const transactionId = body.cpm_trans_id;
      if (!transactionId) {
        return new Response(JSON.stringify({ error: "Missing transaction ID" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Verify transaction status with CinetPay
      const verifyResponse = await fetch("https://client.cinetpay.com/v1/payment/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apikey: CINETPAY_API_KEY,
          site_id: CINETPAY_SITE_ID,
          transaction_id: transactionId,
        }),
      });

      const verifyData = await verifyResponse.json();
      console.log("CinetPay verification response:", JSON.stringify(verifyData));

      const status = verifyData.data?.status === "ACCEPTED" ? "completed" : 
                     verifyData.data?.status === "REFUSED" ? "failed" : "pending";

      const { error: updateError } = await supabase
        .from("payments")
        .update({
          status,
          payment_method: verifyData.data?.payment_method || null,
          cinetpay_data: verifyData.data || null,
        })
        .eq("transaction_id", transactionId);

      if (updateError) {
        console.error("Error updating payment:", updateError);
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "status") {
      const transactionId = url.searchParams.get("transaction_id");
      if (!transactionId) {
        return new Response(JSON.stringify({ error: "Missing transaction_id" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data, error } = await supabase
        .from("payments")
        .select("status, payment_method, amount, currency")
        .eq("transaction_id", transactionId)
        .maybeSingle();

      if (error) throw error;

      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Default: Initialize payment
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { amount, customer_name, customer_phone, customer_email, description } = await req.json();

    if (!amount || !customer_name || !customer_phone) {
      return new Response(
        JSON.stringify({ error: "Champs obligatoires manquants: amount, customer_name, customer_phone" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (amount < 100 || amount > 1500000) {
      return new Response(
        JSON.stringify({ error: "Le montant doit être entre 100 et 1 500 000 FCFA" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const transactionId = `PAY-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    // Save payment in database
    const { error: insertError } = await supabase.from("payments").insert({
      transaction_id: transactionId,
      amount,
      customer_name,
      customer_phone,
      customer_email: customer_email || null,
      description: description || null,
      status: "pending",
    });

    if (insertError) {
      console.error("Error saving payment:", insertError);
      throw new Error("Erreur lors de la sauvegarde du paiement");
    }

    // Get the function URL for notification
    const notifyUrl = `${SUPABASE_URL}/functions/v1/cinetpay-payment?action=notify`;

    // Initialize CinetPay payment
    const cinetpayResponse = await fetch("https://client.cinetpay.com/v1/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apikey: CINETPAY_API_KEY,
        site_id: CINETPAY_SITE_ID,
        transaction_id: transactionId,
        amount: Math.round(amount),
        currency: "XOF",
        description: description || "Paiement Impact Digital",
        customer_name,
        customer_phone_number: customer_phone,
        customer_email: customer_email || "",
        channels: "ALL",
        notify_url: notifyUrl,
        return_url: `${req.headers.get("origin") || "https://showcase-insight-engine.lovable.app"}/paiement?status=done&transaction_id=${transactionId}`,
        cancel_url: `${req.headers.get("origin") || "https://showcase-insight-engine.lovable.app"}/paiement?status=cancelled`,
      }),
    });

    const cinetpayData = await cinetpayResponse.json();
    console.log("CinetPay init response:", JSON.stringify(cinetpayData));

    if (cinetpayData.code !== "201") {
      console.error("CinetPay error:", cinetpayData);
      throw new Error(`CinetPay error [${cinetpayData.code}]: ${cinetpayData.message}`);
    }

    return new Response(
      JSON.stringify({
        payment_url: cinetpayData.data?.payment_url,
        transaction_id: transactionId,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Payment error:", error);
    const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
