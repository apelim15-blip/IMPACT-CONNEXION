import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, XCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface PaymentStatusProps {
  transactionId: string;
}

const PaymentStatus = ({ transactionId }: PaymentStatusProps) => {
  const [status, setStatus] = useState<string>("loading");
  const [paymentData, setPaymentData] = useState<{
    amount?: number;
    currency?: string;
    payment_method?: string;
  } | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("cinetpay-payment", {
          body: null,
          method: "GET",
        });

        // Use direct fetch for GET with query params
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/cinetpay-payment?action=status&transaction_id=${transactionId}`,
          {
            headers: {
              apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            },
          }
        );
        const result = await response.json();

        if (result.data) {
          setStatus(result.data.status || "pending");
          setPaymentData(result.data);
        } else {
          setStatus("pending");
        }
      } catch {
        setStatus("pending");
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, [transactionId]);

  const statusConfig = {
    loading: { icon: Loader2, title: "Vérification...", color: "text-muted-foreground", animate: true },
    pending: { icon: Clock, title: "Paiement en attente", color: "text-yellow-500", animate: false },
    completed: { icon: CheckCircle2, title: "Paiement réussi !", color: "text-green-500", animate: false },
    failed: { icon: XCircle, title: "Paiement échoué", color: "text-destructive", animate: false },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <div className="container mx-auto px-4 max-w-lg">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className={`w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-6`}>
          <Icon className={`w-10 h-10 ${config.color} ${config.animate ? "animate-spin" : ""}`} />
        </div>
        <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">{config.title}</h2>

        {status === "completed" && paymentData && (
          <p className="text-muted-foreground mb-2">
            Montant : {paymentData.amount?.toLocaleString("fr-FR")} {paymentData.currency}
          </p>
        )}

        {status === "pending" && (
          <p className="text-muted-foreground mb-6">
            Votre paiement est en cours de traitement. Cette page se met à jour automatiquement.
          </p>
        )}

        {status === "failed" && (
          <p className="text-muted-foreground mb-6">
            Le paiement n'a pas pu être effectué. Veuillez réessayer.
          </p>
        )}

        <div className="mt-8 flex gap-4 justify-center">
          <Button variant="outline" asChild>
            <a href="/">Retour à l'accueil</a>
          </Button>
          {(status === "failed" || status === "pending") && (
            <Button asChild>
              <a href="/paiement">Nouveau paiement</a>
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentStatus;
