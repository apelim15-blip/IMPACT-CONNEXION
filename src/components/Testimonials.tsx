import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Kouamé Yao",
    role: "Entrepreneur",
    content:
      "Impact Connexion a créé le site web de mon entreprise en un temps record. Le service est professionnel et le résultat dépasse mes attentes. Je recommande vivement !",
    rating: 5,
  },
  {
    name: "Adjoua Marie",
    role: "Commerçante",
    content:
      "Excellente qualité d'impression pour mes cartes de visite et mes bâches publicitaires. Les prix sont très compétitifs et l'équipe est très accueillante.",
    rating: 5,
  },
  {
    name: "Koffi Serge",
    role: "Étudiant",
    content:
      "J'ai fait imprimer et relier mon mémoire chez Impact Connexion. Travail soigné et livré dans les délais. Le cyber café est aussi très pratique pour les recherches.",
    rating: 5,
  },
  {
    name: "Bamba Fatou",
    role: "Organisatrice d'événements",
    content:
      "Pour tous mes événements, c'est chez Impact Connexion que je fais mes impressions : invitations, affiches, badges. Toujours satisfaite du résultat !",
    rating: 5,
  },
];

const Testimonials = () => {
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
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
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
                        {testimonial.role}
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
      </div>
    </section>
  );
};

export default Testimonials;
