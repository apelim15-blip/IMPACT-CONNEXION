import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import ShopCart from "./ShopCart";

const ShopHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <Link to="/boutique" className="flex items-center gap-3">
              <Logo size="sm" />
              <span className="font-bold text-xl font-[Montserrat] text-foreground">
                Impact <span className="text-primary">Shop</span>
              </span>
            </Link>
          </div>
          <ShopCart />
        </div>
      </div>
    </header>
  );
};

export default ShopHeader;
