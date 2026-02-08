import { ShoppingCart, Package, Wrench } from "lucide-react";
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
  product_type: string;
  stock_quantity: number | null;
  category?: { name: string } | null;
}

const ShopProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const isOutOfStock = product.product_type === "physical" && (product.stock_quantity ?? 0) <= 0;
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("fr-FR").format(price) + " FCFA";

  return (
    <Card className="group overflow-hidden border-border/50 hover:shadow-elevated transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-muted">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
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
