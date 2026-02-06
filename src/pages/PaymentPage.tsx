import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaymentForm from "@/components/payment/PaymentForm";
import PaymentStatus from "@/components/payment/PaymentStatus";

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const transactionId = searchParams.get("transaction_id");

  if (status === "done" && transactionId) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20">
          <PaymentStatus transactionId={transactionId} />
        </main>
        <Footer />
      </div>
    );
  }

  if (status === "cancelled") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 max-w-lg text-center py-16">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">✕</span>
            </div>
            <h2 className="font-heading font-bold text-2xl mb-4">Paiement annulé</h2>
            <p className="text-muted-foreground mb-6">
              Votre paiement a été annulé. Vous pouvez réessayer à tout moment.
            </p>
            <a href="/paiement" className="text-primary underline">
              Réessayer
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <PaymentForm />
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
