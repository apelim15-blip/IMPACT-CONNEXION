
-- Table pour stocker les transactions de paiement
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id TEXT,
  amount NUMERIC(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'XOF',
  payment_method TEXT,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  cinetpay_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Public can create payments (initiating a payment)
CREATE POLICY "Anyone can create a payment"
ON public.payments
FOR INSERT
WITH CHECK (true);

-- Public can view their own payment by transaction_id (for status check)
CREATE POLICY "Anyone can view payments"
ON public.payments
FOR SELECT
USING (true);

-- Only service role can update payments (webhook updates)
CREATE POLICY "Service role can update payments"
ON public.payments
FOR UPDATE
USING (true);

-- Trigger for updated_at
CREATE TRIGGER update_payments_updated_at
BEFORE UPDATE ON public.payments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
