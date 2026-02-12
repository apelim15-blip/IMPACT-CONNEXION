import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { name: "Accueil", href: "/#accueil" },
    { name: "Services", href: "/#services" },
    { name: "Boutique", href: "/boutique" },
    { name: "Galerie", href: "/#galerie" },
    { name: "À Propos", href: "/a-propos" },
    { name: "Devis", href: "/#devis" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.href.startsWith("/") && !link.href.includes("#") ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </a>
              )
            ))}
          </nav>

          {/* CTA + Admin */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated && (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin/boutique">
                    <Settings className="w-4 h-4 mr-1" />
                    Admin Shop
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin/parametres">
                    <Settings className="w-4 h-4 mr-1" />
                    Paramètres
                  </Link>
                </Button>
              </>
            )}
            <Button variant="default" size="default" className="shadow-button" asChild>
              <a href="tel:+2250556729448">
                <Phone className="w-4 h-4 mr-2" />
                Contactez-nous
              </a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                link.href.startsWith("/") && !link.href.includes("#") ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                  >
                    {link.name}
                  </a>
                )
              ))}
              {isAuthenticated && (
                <>
                  <Link
                    to="/admin/boutique"
                    onClick={() => setIsMenuOpen(false)}
                    className="font-medium text-primary hover:text-primary/80 transition-colors py-2 flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Admin Shop
                  </Link>
                  <Link
                    to="/admin/parametres"
                    onClick={() => setIsMenuOpen(false)}
                    className="font-medium text-primary hover:text-primary/80 transition-colors py-2 flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Paramètres
                  </Link>
                </>
              )}
              <Button variant="default" className="w-full mt-2 shadow-button" asChild>
                <a href="tel:+2250556729448">
                  <Phone className="w-4 h-4 mr-2" />
                  Contactez-nous
                </a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
