import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import Logo from "@/components/Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <Logo size="md" />
            </Link>
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

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Liens Rapides</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li><a href="/#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="/#galerie" className="hover:text-primary transition-colors">Galerie</a></li>
              <li><Link to="/a-propos" className="hover:text-primary transition-colors">À Propos</Link></li>
              <li><a href="/#devis" className="hover:text-primary transition-colors">Demander un Devis</a></li>
              <li><a href="/#contact" className="hover:text-primary transition-colors">Contact</a></li>
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
