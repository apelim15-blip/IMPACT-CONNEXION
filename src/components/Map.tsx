import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const Map = () => {
  // Coordinates for Divo, Côte d'Ivoire (approximate location)
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31788.89!2d-5.3650!3d5.8372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc0a99e!2sDivo%2C%20C%C3%B4te%20d'Ivoire!5e0!3m2!1sfr!2s!4v1704067200000!5m2!1sfr!2s";
  
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=5.8372,-5.3650&destination_place_id=Divo,+Konankro,+Côte+d'Ivoire";

  return (
    <section id="localisation" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Localisation
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Venez nous <span className="text-gradient">rendre visite</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Retrouvez-nous à Divo, Konankro en face de l'Eglise AD SMYRNE
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          {/* Map Container */}
          <div className="relative rounded-2xl overflow-hidden shadow-card border border-border/50">
            <div className="aspect-[16/9] md:aspect-[21/9]">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Impact Connexion"
                className="w-full h-full"
              />
            </div>

            {/* Address Card Overlay */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:max-w-sm">
              <div className="bg-card/95 backdrop-blur-sm rounded-xl shadow-elevated p-4 md:p-6 border border-border/50">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">
                      Impact Connexion
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Divo, Konankro<br />
                      En face de l'Eglise AD SMYRNE<br />
                      Rue non bitumée
                    </p>
                  </div>
                </div>
                <Button
                  className="w-full shadow-button"
                  asChild
                >
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Obtenir l'itinéraire
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Map;
