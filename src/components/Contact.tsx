import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Youtube, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// TikTok icon component (not available in lucide-react)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const contactInfo = [
  {
    icon: Phone,
    title: "Téléphone",
    value: "+225 05 56 72 94 48",
    link: "tel:+2250556729448",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+225 05 56 72 94 48",
    link: "https://wa.me/2250556729448",
  },
  {
    icon: Mail,
    title: "Email",
    value: "impactconnexion078@gmail.com",
    link: "mailto:impactconnexion078@gmail.com",
  },
  {
    icon: MapPin,
    title: "Adresse",
    value: "Divo, Konankro en face de l'Eglise AD SMYRNE",
    link: "#",
  },
];

const socialLinks = [
  {
    icon: Youtube,
    title: "YouTube",
    value: "@apelimendosa6313",
    link: "https://www.youtube.com/@apelimendosa6313",
    color: "bg-red-600",
  },
  {
    icon: TikTokIcon,
    title: "TikTok",
    value: "@m_mendosa1",
    link: "https://tiktok.com/@m_mendosa1",
    color: "bg-black",
  },
  {
    icon: Facebook,
    title: "Facebook",
    value: "Impact Connexion",
    link: "https://web.facebook.com/Impactconexion?mibextid=ZbWKwL",
    color: "bg-blue-600",
  },
];

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-muted/30">
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
            Contact
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Prenez contact avec{" "}
            <span className="text-gradient">nous</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner
          </p>
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-12"
        >
          <h3 className="font-heading font-semibold text-xl text-center mb-6">
            Suivez-nous sur les réseaux sociaux
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.title}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-border/50">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${social.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <social.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{social.title}</p>
                      <p className="text-xs text-muted-foreground">{social.value}</p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {contactInfo.map((info) => (
            <a
              key={info.title}
              href={info.link}
              target={info.link.startsWith("http") ? "_blank" : undefined}
              rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
              className="block"
            >
              <Card className="h-full shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-border/50 group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    {info.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {info.value}
                  </p>
                </CardContent>
              </Card>
            </a>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-dark rounded-2xl p-8 md:p-12 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-primary-foreground/80 mb-4">
            <Clock className="w-5 h-5" />
            <span>Ouvert tous les jours de 8h à 21h</span>
          </div>
          <h3 className="font-heading font-bold text-2xl md:text-3xl text-primary-foreground mb-4">
            Besoin d'un service urgent ?
          </h3>
          <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
            Appelez-nous directement ou envoyez un message WhatsApp pour une réponse rapide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary-foreground text-secondary hover:bg-primary-foreground/90"
              asChild
            >
              <a href="tel:+2250556729448">
                <Phone className="w-5 h-5 mr-2" />
                Appeler maintenant
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <a
                href="https://wa.me/2250556729448"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Message WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
