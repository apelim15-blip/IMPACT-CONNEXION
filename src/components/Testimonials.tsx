import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Send, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  content: string;
  rating: number;
  created_at: string;
}

const defaultTestimonials = [
  {
    id: "default-1",
    name: "Kouamé Yao",
    role: "Entrepreneur",
    content:
      "Impact Connexion a créé le site web de mon entreprise en un temps record. Le service est professionnel et le résultat dépasse mes attentes. Je recommande vivement !",
    rating: 5,
    created_at: "",
  },
  {
    id: "default-2",
    name: "Adjoua Marie",
    role: "Commerçante",
    content:
      "Excellente qualité d'impression pour mes cartes de visite et mes bâches publicitaires. Les prix sont très compétitifs et l'équipe est très accueillante.",
    rating: 5,
    created_at: "",
  },
  {
    id: "default-3",
    name: "Koffi Serge",
    role: "Étudiant",
    content:
      "J'ai fait imprimer et relier mon mémoire chez Impact Connexion. Travail soigné et livré dans les délais. Le cyber café est aussi très pratique pour les recherches.",
    rating: 5,
    created_at: "",
  },
  {
    id: "default-4",
    name: "Bamba Fatou",
    role: "Organisatrice d'événements",
    content:
      "Pour tous mes événements, c'est chez Impact Connexion que je fais mes impressions : invitations, affiches, badges. Toujours satisfaite du résultat !",
    rating: 5,
    created_at: "",
  },
];

const Testimonials = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setTestimonials([...data, ...defaultTestimonials]);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.content.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("testimonials").insert({
        name: formData.name.trim(),
        role: formData.role.trim() || null,
        content: formData.content.trim(),
        rating: formData.rating,
      });

      if (error) throw error;

      toast({
        title: "Merci pour votre témoignage !",
        description: "Votre avis sera publié après validation.",
      });

      setFormData({ name: "", role: "", content: "", rating: 5 });
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="temoignages" className="py-20 md:py-28 bg-muted/30">
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
            Témoignages
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Ce que nos <span className="text-gradient">clients</span> disent
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            La satisfaction de nos clients est notre priorité absolue
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {testimonials.slice(0, 4).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full shadow-card hover:shadow-elevated transition-shadow duration-300 border-border/50">
                <CardContent className="p-6 md:p-8">
                  <Quote className="w-10 h-10 text-primary/20 mb-4" />
                  <p className="text-foreground/80 leading-relaxed mb-6">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-heading font-semibold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role || "Client"}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-primary text-primary"
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Add Testimonial Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          {!showForm ? (
            <div className="text-center">
              <Button
                onClick={() => setShowForm(true)}
                size="lg"
                className="gap-2"
              >
                <Send className="w-4 h-4" />
                Laisser un avis
              </Button>
            </div>
          ) : (
            <Card className="shadow-card border-border/50">
              <CardContent className="p-6 md:p-8">
                <h3 className="font-heading font-semibold text-xl mb-6 text-center">
                  Partagez votre expérience
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom *</Label>
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
                      <Label htmlFor="role">Profession</Label>
                      <Input
                        id="role"
                        placeholder="Ex: Entrepreneur"
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                        maxLength={100}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Votre avis *</Label>
                    <Textarea
                      id="content"
                      placeholder="Partagez votre expérience avec Impact Connexion..."
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      maxLength={500}
                      rows={4}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Note</Label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-8 h-8 transition-colors ${
                              star <= formData.rating
                                ? "fill-primary text-primary"
                                : "fill-muted text-muted-foreground"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      className="flex-1"
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Envoi...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Envoyer
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
