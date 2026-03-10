import carteVisite from "@/assets/shop/carte-visite.jpg";
import flyersA5 from "@/assets/shop/flyers-a5.jpg";
import banniereRollup from "@/assets/shop/banniere-rollup.jpg";
import tshirt from "@/assets/shop/tshirt.jpg";
import mug from "@/assets/shop/mug.jpg";
import porteCles from "@/assets/shop/porte-cles.jpg";
import photoPortrait from "@/assets/shop/photo-portrait.jpg";
import shootingCorporate from "@/assets/shop/shooting-corporate.jpg";
import creationLogo from "@/assets/shop/creation-logo.jpg";
import charteGraphique from "@/assets/shop/charte-graphique.jpg";
import communityManagement from "@/assets/shop/community-management.jpg";
import siteWeb from "@/assets/shop/site-web.jpg";

const shopImageMap: Record<string, string> = {
  "carte-visite-premium": carteVisite,
  "flyers-a5": flyersA5,
  "banniere-rollup": banniereRollup,
  "tshirt-personnalise": tshirt,
  "mug-personnalise": mug,
  "porte-cles": porteCles,
  "seance-photo-portrait": photoPortrait,
  "shooting-corporate": shootingCorporate,
  "creation-logo": creationLogo,
  "charte-graphique": charteGraphique,
  "community-management": communityManagement,
  "site-web-vitrine": siteWeb,
};

export function getProductFallbackImage(slug: string): string | undefined {
  return shopImageMap[slug];
}
