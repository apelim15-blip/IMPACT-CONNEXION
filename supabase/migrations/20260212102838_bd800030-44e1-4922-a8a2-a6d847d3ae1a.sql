
-- Create site_settings table for key-value pairs
CREATE TABLE public.site_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key text NOT NULL UNIQUE,
  value text,
  category text NOT NULL DEFAULT 'general',
  label text NOT NULL,
  field_type text NOT NULL DEFAULT 'text',
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view settings" ON public.site_settings
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage settings" ON public.site_settings
  FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

-- Insert default settings
INSERT INTO public.site_settings (key, value, category, label, field_type, sort_order) VALUES
  -- General
  ('site_name', 'Impact Connexion', 'general', 'Nom du site', 'text', 1),
  ('site_description', 'Agence de communication et services numériques', 'general', 'Description du site', 'textarea', 2),
  ('site_tagline', 'Votre partenaire digital', 'general', 'Slogan', 'text', 3),
  -- Contact
  ('contact_phone', '+225 07 49 67 27 57', 'contact', 'Téléphone', 'text', 1),
  ('contact_email', 'contact@impactconnexion.com', 'contact', 'Email', 'text', 2),
  ('contact_address', 'Abidjan, Côte d''Ivoire', 'contact', 'Adresse', 'text', 3),
  ('contact_hours', 'Lun - Ven : 8h - 18h', 'contact', 'Horaires', 'text', 4),
  ('contact_whatsapp', '+225 07 49 67 27 57', 'contact', 'WhatsApp', 'text', 5),
  -- Social
  ('social_facebook', '', 'social', 'Facebook', 'text', 1),
  ('social_instagram', '', 'social', 'Instagram', 'text', 2),
  ('social_tiktok', '', 'social', 'TikTok', 'text', 3),
  ('social_youtube', '', 'social', 'YouTube', 'text', 4),
  ('social_linkedin', '', 'social', 'LinkedIn', 'text', 5),
  ('social_twitter', '', 'social', 'X (Twitter)', 'text', 6);
