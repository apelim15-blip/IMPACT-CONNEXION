import { useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import ShopCheckout from "./ShopCheckout";

const ShopCart = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("fr-FR").format(price) + " FCFA";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-[Montserrat]">
            Mon Panier ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {showCheckout ? (
          <ShopCheckout onBack={() => setShowCheckout(false)} />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 mt-4">
              {items.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p>Votre panier est vide</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start">
                    <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground/40">
                          <ShoppingCart className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{item.name}</h4>
                      <p className="text-sm text-primary font-semibold">{formatPrice(item.price)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <p className="text-sm font-bold">{formatPrice(item.price * item.quantity)}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t pt-4 space-y-3">
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-xl text-primary">{formatPrice(totalPrice)}</span>
                </div>
                <Button className="w-full shadow-button" size="lg" onClick={() => setShowCheckout(true)}>
                  Commander
                </Button>
              </div>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShopCart;
