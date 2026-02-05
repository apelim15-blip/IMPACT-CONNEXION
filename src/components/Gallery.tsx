import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

import printing1 from "@/assets/gallery/printing-1.jpg";
import printing2 from "@/assets/gallery/printing-2.jpg";
import cyber1 from "@/assets/gallery/cyber-1.jpg";
import cards1 from "@/assets/gallery/cards-1.jpg";
import banners1 from "@/assets/gallery/banners-1.jpg";
import badges1 from "@/assets/gallery/badges-1.jpg";
import impactConnexionIA from "@/assets/gallery/impact-connexion-ia.png";
import maisonAbondance from "@/assets/gallery/maison-abondance.png";
import seminaireArcs from "@/assets/gallery/seminaire-arcs.png";
import topjusBissap from "@/assets/gallery/topjus-bissap.png";

const galleryItems = [
  { src: impactConnexionIA, title: "Impact Connexion IA", category: "Affiche" },
  { src: maisonAbondance, title: "La Maison de l'Abondance", category: "Bannière" },
  { src: seminaireArcs, title: "Séminaire ARCS", category: "Affiche" },
  { src: topjusBissap, title: "TopJus Bissap", category: "Bannière" },
  { src: printing1, title: "Impression grand format", category: "Imprimerie" },
  { src: printing2, title: "Objets personnalisés", category: "Imprimerie" },
  { src: cyber1, title: "Espace cyber café", category: "Cyber" },
  { src: cards1, title: "Cartes de visite & invitations", category: "Imprimerie" },
  { src: banners1, title: "Bâches & signalétique", category: "Imprimerie" },
  { src: badges1, title: "Badges PVC", category: "Imprimerie" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="galerie" className="py-20 md:py-28">
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
            Nos Réalisations
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Galerie de nos <span className="text-gradient">travaux</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez quelques exemples de nos réalisations et de nos locaux
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-card"
              onClick={() => setSelectedImage(item.src)}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-xs text-primary font-medium mb-1">
                  {item.category}
                </span>
                <h3 className="text-primary-foreground font-heading font-semibold text-sm md:text-base">
                  {item.title}
                </h3>
                <ZoomIn className="absolute top-4 right-4 w-6 h-6 text-primary-foreground" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-secondary/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 p-2 text-primary-foreground hover:text-primary transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-[85vh] rounded-lg shadow-elevated"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
