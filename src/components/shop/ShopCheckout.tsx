import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ShopCheckout = ({ onBack }: { onBack: () => void }) => {
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  const hasPhysical = items.some((i) => i.product_type === "physical");

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("fr-FR").format(price) + " FCFA";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast({ title: "Erreur", description: "Nom et téléphone requis.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from("shop_orders")
        .insert({
          customer_name: form.name.trim(),
          customer_phone: form.phone.trim(),
          customer_email: form.email.trim() || null,
          shipping_address: form.address.trim() || null,
          notes: form.notes.trim() || null,
          total_amount: totalPrice,
          order_number: "temp", // will be overridden by trigger
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from("shop_order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Initiate payment via CinetPay
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke(
        "cinetpay-payment",
        {
          body: {
            action: "initialize",
            amount: totalPrice,
            customer_name: form.name.trim(),
            customer_phone: form.phone.trim(),
            customer_email: form.email.trim() || undefined,
            description: `Commande Impact Shop - ${order.order_number}`,
          },
        }
      );

      if (paymentError) throw paymentError;

      if (paymentData?.payment_url) {
        // Update order with payment_id
        if (paymentData.payment_id) {
          await supabase
            .from("shop_orders")
            .update({ payment_id: paymentData.payment_id })
            .eq("id", order.id);
        }
        clearCart();
        window.open(paymentData.payment_url, "_blank");
        toast({
          title: "Commande créée !",
          description: `N° ${order.order_number} — Vous allez être redirigé vers le paiement.`,
        });
        onBack();
      } else {
        throw new Error("Pas d'URL de paiement");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      toast({
        title: "Erreur",
        description: err.message || "Impossible de finaliser la commande.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <Button variant="ghost" size="sm" className="self-start mb-4" onClick={onBack}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour au panier
      </Button>

      <form onSubmit={handleSubmit} className="flex-1 space-y-4 overflow-y-auto">
        <div>
          <Label htmlFor="name">Nom complet *</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            maxLength={100}
          />
        </div>
        <div>
          <Label htmlFor="phone">Téléphone *</Label>
          <Input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
            maxLength={20}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            maxLength={255}
          />
        </div>
        {hasPhysical && (
          <div>
            <Label htmlFor="address">Adresse de livraison</Label>
            <Textarea
              id="address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              maxLength={500}
              rows={2}
            />
          </div>
        )}
        <div>
          <Label htmlFor="notes">Notes (optionnel)</Label>
          <Textarea
            id="notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            maxLength={500}
            rows={2}
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total à payer</span>
            <span className="font-bold text-primary text-lg">{formatPrice(totalPrice)}</span>
          </div>
          <Button type="submit" className="w-full shadow-button" size="lg" disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Payer {formatPrice(totalPrice)}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ShopCheckout;
