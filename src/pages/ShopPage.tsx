import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Store, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import ShopHeader from "@/components/shop/ShopHeader";
import ShopProductCard from "@/components/shop/ShopProductCard";
import ShopCategoryFilter from "@/components/shop/ShopCategoryFilter";
import Footer from "@/components/Footer";

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const { data: categories = [] } = useQuery({
    queryKey: ["shop-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("shop_categories")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["shop-products", selectedCategory, search],
    queryFn: async () => {
      let query = supabase
        .from("shop_products")
        .select("*, category:shop_categories(name, slug)")
        .eq("is_active", true)
        .order("sort_order");

      if (selectedCategory) {
        const cat = categories.find((c) => c.slug === selectedCategory);
        if (cat) query = query.eq("category_id", cat.id);
      }

      if (search.trim()) {
        query = query.ilike("name", `%${search.trim()}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: true,
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ShopHeader />

      {/* Hero */}
      <section className="bg-gradient-hero py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold font-[Montserrat] text-foreground mb-4">
            Impact <span className="text-gradient">Shop</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Découvrez nos produits et services — impressions, goodies, prestations créatives et plus encore.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher un produit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
              maxLength={100}
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="container mx-auto px-4 py-10 flex-1">
        {categories.length > 0 && (
          <div className="mb-8">
            <ShopCategoryFilter
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Store className="w-16 h-16 mx-auto mb-4 opacity-40" />
            <h2 className="text-xl font-semibold mb-2">Aucun produit disponible</h2>
            <p>De nouveaux articles arrivent bientôt !</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ShopProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ShopPage;
