import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  CheckCircle2, 
  Target, 
  Heart, 
  Zap, 
  Users, 
  Award, 
  Clock, 
  ArrowRight,
  Phone,
  Mail,
  Linkedin,
  Facebook
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import founderImage from "@/assets/founder.jpg";

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "Nous visons l'excellence dans chaque service que nous offrons, avec un souci constant de la qualité.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Notre passion pour la technologie nous pousse à innover et à offrir les meilleures solutions.",
  },
  {
    icon: Zap,
    title: "Réactivité",
    description: "Nous comprenons l'urgence de vos besoins et nous nous engageons à répondre rapidement.",
  },
  {
    icon: Users,
    title: "Proximité",
    description: "Nous créons des relations de confiance durables avec nos clients à travers un service personnalisé.",
  },
];

const stats = [
  { value: "500+", label: "Clients Satisfaits" },
  { value: "5+", label: "Années d'Expérience" },
  { value: "1000+", label: "Projets Réalisés" },
  { value: "24/7", label: "Support Disponible" },
];

const milestones = [
  { year: "2019", title: "Création", description: "Ouverture d'Impact Connexion à Divo avec un simple cyber café." },
  { year: "2020", title: "Expansion", description: "Ajout des services d'imprimerie et de formation informatique." },
  { year: "2022", title: "Innovation", description: "Lancement des services de création web et montage audiovisuel." },
  { year: "2024", title: "Leadership", description: "Devenu le centre numérique de référence à Divo et ses environs." },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
                À Propos de Nous
              </span>
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
                L'histoire d'<span className="text-gradient">Impact Connexion</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                Découvrez notre mission, notre équipe et notre engagement à transformer 
                le paysage numérique à Divo et en Côte d'Ivoire.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-primary rounded-2xl opacity-20" />
                <img
                  src={founderImage}
                  alt="Fondateur d'Impact Connexion"
                  className="relative rounded-2xl shadow-elevated w-full max-w-md mx-auto lg:mx-0 object-cover aspect-[4/5]"
                />
                <div className="absolute -bottom-6 -right-6 bg-card rounded-xl shadow-card p-4 border border-border">
                  <Logo size="sm" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
                  Le Fondateur
                </span>
                <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                  Une vision, une <span className="text-gradient">passion</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  Fondateur et directeur d'Impact Connexion, sa vision est de démocratiser 
                  l'accès aux technologies numériques à Divo et dans toute la région. 
                  Passionné par l'innovation et le service client, il a créé un espace 
                  où professionnels, étudiants et particuliers trouvent des solutions 
                  adaptées à leurs besoins.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  "Notre mission est simple : rendre la technologie accessible à tous, 
                  avec un service de qualité et un accompagnement personnalisé. 
                  Chaque client qui franchit notre porte devient un membre de la famille 
                  Impact Connexion."
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                      <Facebook className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="mailto:impactconnexion078@gmail.com">
                      <Mail className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="tel:+2250556729448">
                      <Phone className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-dark">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="font-heading font-bold text-4xl md:text-5xl text-primary-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-primary-foreground/70 text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
                Nos Valeurs
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
                Ce qui nous <span className="text-gradient">définit</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Nos valeurs guident chacune de nos actions et décisions au quotidien
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center shadow-card hover:shadow-elevated transition-shadow duration-300 border-border/50">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                        <value.icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <h3 className="font-heading font-semibold text-xl mb-3">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
                Notre Parcours
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
                Une histoire de <span className="text-gradient">croissance</span>
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6 mb-8 last:mb-0"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-sm">
                      {milestone.year}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="font-heading font-semibold text-xl mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-dark rounded-3xl p-8 md:p-16 text-center"
            >
              <Logo size="lg" showText={false} className="justify-center mb-6 [&_img]:brightness-0 [&_img]:invert" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground mb-4">
                Prêt à travailler avec nous ?
              </h2>
              <p className="text-primary-foreground/70 text-lg mb-8 max-w-xl mx-auto">
                Que vous ayez besoin d'un service ponctuel ou d'un partenaire à long terme, 
                nous sommes là pour vous accompagner.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary-foreground text-secondary hover:bg-primary-foreground/90"
                  asChild
                >
                  <a href="/#devis">
                    Demander un devis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <a href="/#contact">
                    Nous contacter
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
