import { Link, useNavigate } from "react-router-dom";
import { LogOut, ArrowLeft, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";
import AdminSiteSettings from "@/components/admin/AdminSiteSettings";

const AdminSettingsPage = () => {
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
                <Link to="/"><ArrowLeft className="w-5 h-5" /></Link>
              </Button>
              <Logo size="sm" />
              <h1 className="font-bold text-lg font-[Montserrat]">
                <Settings className="w-5 h-5 inline mr-2" />
                Paramètres du <span className="text-primary">site</span>
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
        <AdminSiteSettings />
      </main>
    </div>
  );
};

export default AdminSettingsPage;
