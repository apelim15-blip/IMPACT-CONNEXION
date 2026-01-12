import { motion } from "framer-motion";
import { CheckCircle2, Users, Award, Clock, Target, Heart, Zap } from "lucide-react";
import Logo from "@/components/Logo";

const stats = [
  { icon: Users, value: "500+", label: "Clients satisfaits" },
  { icon: Award, value: "5+", label: "Années d'expérience" },
  { icon: Clock, value: "24/7", label: "Support disponible" },
];

const features = [
  "Équipe professionnelle et qualifiée",
  "Services rapides et de qualité",
  "Prix compétitifs",
  "Accompagnement personnalisé",
  "Technologies modernes",
  "Satisfaction garantie",
];

const About = () => {
  return (
    <section id="apropos" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              À Propos
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
              Votre partenaire{" "}
              <span className="text-gradient">numérique</span> de confiance
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Impact Connexion est votre centre de services numériques complet à Divo. 
              Nous combinons expertise technologique et service client exceptionnel pour 
              répondre à tous vos besoins en matière de cyber café, informatique et imprimerie.
            </p>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground/80">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Stats & Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-primary rounded-3xl opacity-10 blur-3xl" />
            
            {/* Stats Cards */}
            <div className="relative bg-card rounded-2xl shadow-card border border-border p-8">
              <div className="text-center mb-8">
                <Logo size="lg" showText={false} className="justify-center mb-4" />
                <h3 className="font-heading font-bold text-2xl mb-2">
                  IMPACT CONNEXION
                </h3>
                <p className="text-muted-foreground">
                  La Maison De L'Intelligence Artificielle
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-xl bg-muted/50"
                  >
                    <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="font-heading font-bold text-2xl text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
