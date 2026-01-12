import { motion } from "framer-motion";
import { 
  Wifi, 
  FileText, 
  Printer, 
  Camera, 
  BookOpen, 
  ScanLine,
  Monitor, 
  GraduationCap, 
  Video, 
  Share2, 
  TrendingUp,
  Globe,
  Image,
  Shirt,
  CreditCard,
  Heart,
  Palette
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const serviceCategories = [
  {
    title: "Cyber",
    subtitle: "Services numériques quotidiens",
    icon: Wifi,
    color: "primary",
    services: [
      { icon: Wifi, name: "Connexion internet Wi-Fi" },
      { icon: Globe, name: "Inscription en Ligne" },
      { icon: FileText, name: "Traitement de Texte" },
      { icon: BookOpen, name: "Rédaction de Mémoire & Projet" },
      { icon: Printer, name: "Impression" },
      { icon: ScanLine, name: "Photocopie & Scanner" },
      { icon: Camera, name: "Photos Minute" },
      { icon: CreditCard, name: "Plastification & Reliure" },
    ],
  },
  {
    title: "Domaine Informatique",
    subtitle: "Solutions digitales professionnelles",
    icon: Monitor,
    color: "secondary",
    services: [
      { icon: Globe, name: "Création de Site Internet" },
      { icon: GraduationCap, name: "Formation Informatique" },
      { icon: Monitor, name: "Système d'Exploitation Windows" },
      { icon: Video, name: "Montage Audiovisuel" },
      { icon: Share2, name: "Création de Page et Compte Pro" },
      { icon: TrendingUp, name: "Monétisation Réseaux Sociaux" },
    ],
  },
  {
    title: "Imprimerie",
    subtitle: "Impressions tous formats",
    icon: Printer,
    color: "primary",
    services: [
      { icon: Image, name: "Impression Grand Format (Vinyle & Bâche)" },
      { icon: Shirt, name: "Impression sur Tee-Shirt, Casque, Tasses" },
      { icon: CreditCard, name: "Impression de Badge en PVC" },
      { icon: Heart, name: "Cartes de Visite, Mariage, Anniversaire" },
      { icon: Palette, name: "Création d'Affiche & Logo" },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-muted/30">
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
            Nos Services
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Des solutions pour tous vos{" "}
            <span className="text-gradient">besoins</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Impact Connexion vous accompagne dans tous vos projets numériques et d'impression
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {serviceCategories.map((category) => (
            <motion.div key={category.title} variants={itemVariants}>
              <Card className="h-full shadow-card hover:shadow-elevated transition-shadow duration-300 border-border/50 overflow-hidden group">
                <CardHeader className="pb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    category.color === "primary" 
                      ? "bg-gradient-primary" 
                      : "bg-gradient-dark"
                  }`}>
                    <category.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <CardTitle className="font-heading text-xl font-bold">
                    {category.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {category.subtitle}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.services.map((service) => (
                      <li
                        key={service.name}
                        className="flex items-start gap-3 text-sm"
                      >
                        <service.icon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground/80">{service.name}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
