import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full border-3 border-primary" />
                <div className="absolute top-0 right-0 w-5 h-5 border-3 border-primary-foreground/50 rounded-full -translate-y-0.5 translate-x-0.5" />
              </div>
              <span className="font-heading font-bold text-lg">
                IMPACT <span className="text-primary">CONNEXION</span>
              </span>
            </div>
            <p className="text-secondary-foreground/70 text-sm leading-relaxed">
              La Maison De L'Intelligence Artificielle. 
              Votre partenaire numérique de confiance à Divo.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Nos Services</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li>Cyber Café & Wi-Fi</li>
              <li>Création de Sites Internet</li>
              <li>Formation Informatique</li>
              <li>Impression Grand Format</li>
              <li>Montage Audiovisuel</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-secondary-foreground/70">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-primary mt-0.5" />
                <span>+225 05 56 72 94 48</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-primary mt-0.5" />
                <span>impactconnexion078@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>Divo, Konankro en face de l'Eglise AD SMYRNE</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-secondary-foreground/10 text-center text-sm text-secondary-foreground/60">
          <p>© {currentYear} Impact Connexion. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
