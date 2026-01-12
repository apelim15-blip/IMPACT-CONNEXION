import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const serviceOptions = [
  { id: "wifi", label: "Connexion Wi-Fi" },
  { id: "impression", label: "Impression documents" },
  { id: "site-web", label: "Création de site web" },
  { id: "formation", label: "Formation informatique" },
  { id: "montage", label: "Montage audiovisuel" },
  { id: "grand-format", label: "Impression grand format" },
  { id: "tshirt", label: "Impression sur textile" },
  { id: "badges", label: "Badges PVC" },
  { id: "cartes", label: "Cartes de visite/invitation" },
  { id: "affiches", label: "Affiches & Logos" },
];

const QuoteForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    services: [] as string[],
    message: "",
  });

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((s) => s !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    if (formData.services.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner au moins un service.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Demande envoyée !",
      description: "Nous vous contacterons très bientôt.",
    });
  };

  if (isSubmitted) {
    return (
      <section id="devis" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center py-16"
          >
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
              Merci pour votre demande !
            </h3>
            <p className="text-muted-foreground mb-8">
              Notre équipe vous contactera dans les plus brefs délais pour discuter de votre projet.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  services: [],
                  message: "",
                });
              }}
            >
              Nouvelle demande
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="devis" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Devis Gratuit
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Demandez un <span className="text-gradient">devis</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Décrivez votre projet et nous vous répondrons rapidement
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-card rounded-2xl shadow-card border border-border/50 p-6 md:p-10"
        >
          {/* Personal Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet *</Label>
              <Input
                id="name"
                placeholder="Votre nom"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                maxLength={100}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+225 XX XX XX XX XX"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                maxLength={20}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email">Email (optionnel)</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                maxLength={255}
              />
            </div>
          </div>

          {/* Services Selection */}
          <div className="mb-8">
            <Label className="mb-4 block">Services souhaités *</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {serviceOptions.map((service) => (
                <div
                  key={service.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    formData.services.includes(service.id)
                      ? "border-primary bg-accent"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => handleServiceToggle(service.id)}
                >
                  <Checkbox
                    id={service.id}
                    checked={formData.services.includes(service.id)}
                    onCheckedChange={() => handleServiceToggle(service.id)}
                  />
                  <Label
                    htmlFor={service.id}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {service.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="mb-8 space-y-2">
            <Label htmlFor="message">Détails du projet</Label>
            <Textarea
              id="message"
              placeholder="Décrivez votre projet, vos besoins, quantités, délais..."
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              maxLength={2000}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full shadow-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Envoyer ma demande
              </>
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default QuoteForm;
