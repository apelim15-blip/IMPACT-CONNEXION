import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Smartphone, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Logo from "@/components/Logo";

const paymentMethods = [
  { id: "orange", label: "Orange Money", icon: "🟠", color: "border-orange-400 bg-orange-50 dark:bg-orange-950/20" },
  { id: "mtn", label: "MTN Money", icon: "🟡", color: "border-yellow-400 bg-yellow-50 dark:bg-yellow-950/20" },
  { id: "wave", label: "Wave", icon: "🔵", color: "border-blue-400 bg-blue-50 dark:bg-blue-950/20" },
  { id: "card", label: "Carte bancaire", icon: "💳", color: "border-gray-400 bg-gray-50 dark:bg-gray-950/20" },
];

const PaymentForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    amount: "",
    name: "",
    phone: "",
    email: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const amount = parseFloat(formData.amount);
    if (!amount || amount < 100) {
      toast({ title: "Erreur", description: "Le montant minimum est de 100 FCFA.", variant: "destructive" });
      return;
    }
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({ title: "Erreur", description: "Veuillez remplir les champs obligatoires.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("cinetpay-payment", {
        body: {
          amount,
          customer_name: formData.name.trim(),
          customer_phone: formData.phone.trim(),
          customer_email: formData.email.trim() || undefined,
          description: formData.description.trim() || undefined,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      if (data?.payment_url) {
        window.location.href = data.payment_url;
      } else {
        throw new Error("URL de paiement non reçue");
      }
    } catch (err: unknown) {
      console.error("Payment error:", err);
      const message = err instanceof Error ? err.message : "Erreur lors de l'initialisation du paiement";
      toast({ title: "Erreur", description: message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
          Paiement sécurisé
        </span>
        <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
          Effectuez votre <span className="text-gradient">paiement</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Payez en toute sécurité via mobile money ou carte bancaire
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-card rounded-2xl shadow-card border border-border/50 p-6 md:p-10"
      >
        <div className="flex justify-center mb-8">
          <Logo size="md" />
        </div>

        {/* Payment Methods */}
        <div className="mb-8">
          <Label className="mb-4 block text-base font-semibold">Moyen de paiement</Label>
          <div className="grid grid-cols-2 gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setSelectedMethod(method.id)}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  selectedMethod === method.id
                    ? `${method.color} border-primary shadow-md scale-[1.02]`
                    : "border-border hover:border-primary/40"
                }`}
              >
                <span className="text-2xl">{method.icon}</span>
                <span className="font-medium text-sm">{method.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div className="mb-6 space-y-2">
          <Label htmlFor="amount">Montant (FCFA) *</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Ex: 5000"
            min={100}
            max={1500000}
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
          />
        </div>

        {/* Personal Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="pay-name">Nom complet *</Label>
            <Input
              id="pay-name"
              placeholder="Votre nom"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              maxLength={100}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pay-phone">Téléphone *</Label>
            <Input
              id="pay-phone"
              type="tel"
              placeholder="+225 XX XX XX XX XX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              maxLength={20}
              required
            />
          </div>
        </div>

        <div className="mb-6 space-y-2">
          <Label htmlFor="pay-email">Email (optionnel)</Label>
          <Input
            id="pay-email"
            type="email"
            placeholder="votre@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            maxLength={255}
          />
        </div>

        <div className="mb-8 space-y-2">
          <Label htmlFor="pay-desc">Description du paiement</Label>
          <Textarea
            id="pay-desc"
            placeholder="Ex: Paiement impression 500 cartes de visite"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            maxLength={500}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full shadow-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Traitement en cours...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5 mr-2" />
              Payer {formData.amount ? `${parseInt(formData.amount).toLocaleString("fr-FR")} FCFA` : ""}
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-4">
          🔒 Paiement sécurisé via CinetPay. Vos données sont protégées.
        </p>
      </motion.form>
    </div>
  );
};

export default PaymentForm;
