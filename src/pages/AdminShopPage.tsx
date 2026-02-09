import { Link, useNavigate } from "react-router-dom";
import { LogOut, ShoppingBag, LayoutGrid, Package, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";
import AdminCategories from "@/components/admin/AdminCategories";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminOrders from "@/components/admin/AdminOrders";

const AdminShopPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Déconnexion réussie" });
    navigate("/connexion");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/boutique"><ArrowLeft className="w-5 h-5" /></Link>
              </Button>
              <Logo size="sm" />
              <h1 className="font-bold text-lg font-[Montserrat]">
                Admin <span className="text-primary">Shop</span>
              </h1>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="products">
          <TabsList className="mb-6">
            <TabsTrigger value="products" className="gap-2">
              <ShoppingBag className="w-4 h-4" />
              Produits
            </TabsTrigger>
            <TabsTrigger value="categories" className="gap-2">
              <LayoutGrid className="w-4 h-4" />
              Catégories
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <Package className="w-4 h-4" />
              Commandes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="products"><AdminProducts /></TabsContent>
          <TabsContent value="categories"><AdminCategories /></TabsContent>
          <TabsContent value="orders"><AdminOrders /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminShopPage;
