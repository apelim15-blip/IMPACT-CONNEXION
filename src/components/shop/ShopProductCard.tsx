import { useState } from "react";
import { ShoppingCart, Package, Wrench, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  image_url: string | null;
  images?: string[] | null;
  product_type: string;
  stock_quantity: number | null;
  category?: { name: string } | null;
}

const ShopProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [currentImg, setCurrentImg] = useState(0);
  const isOutOfStock = product.product_type === "physical" && (product.stock_quantity ?? 0) <= 0;
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;

  const allImages = [
    ...(product.image_url ? [product.image_url] : []),
    ...(product.images || []),
  ].filter(Boolean);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("fr-FR").format(price) + " FCFA";

  const prevImg = (e: React.MouseEvent) => { e.stopPropagation(); setCurrentImg((p) => (p === 0 ? allImages.length - 1 : p - 1)); };
  const nextImg = (e: React.MouseEvent) => { e.stopPropagation(); setCurrentImg((p) => (p === allImages.length - 1 ? 0 : p + 1)); };

  return (
    <Card className="group overflow-hidden border-border/50 hover:shadow-elevated transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-muted">
        {allImages.length > 0 ? (
          <>
            <img
              src={allImages[currentImg]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {allImages.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-1.5 top-1/2 -translate-y-1/2 h-7 w-7 opacity-0 group-hover:opacity-90 transition-opacity rounded-full"
                  onClick={prevImg}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 opacity-0 group-hover:opacity-90 transition-opacity rounded-full"
                  onClick={nextImg}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {allImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setCurrentImg(i); }}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentImg ? "bg-primary" : "bg-white/60"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {product.product_type === "service" ? (
              <Wrench className="w-12 h-12 text-muted-foreground/40" />
            ) : (
              <Package className="w-12 h-12 text-muted-foreground/40" />
            )}
          </div>
        )}
        {hasDiscount && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            -{Math.round(((product.compare_at_price! - product.price) / product.compare_at_price!) * 100)}%
          </Badge>
        )}
        {product.product_type === "service" && (
          <Badge variant="secondary" className="absolute top-3 right-3">
            Service
          </Badge>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm">Rupture de stock</Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4 space-y-2">
        {product.category && (
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {product.category.name}
          </p>
        )}
        <h3 className="font-semibold text-foreground line-clamp-2 font-[Montserrat]">{product.name}</h3>
        {product.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        )}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.compare_at_price!)}
            </span>
          )}
        </div>
        <Button
          className="w-full shadow-button mt-2"
          disabled={isOutOfStock}
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              image_url: product.image_url,
              product_type: product.product_type,
            })
          }
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {isOutOfStock ? "Indisponible" : "Ajouter au panier"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShopProductCard;
