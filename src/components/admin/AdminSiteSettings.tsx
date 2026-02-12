import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Globe, Phone, Share2, Loader2 } from "lucide-react";

interface Setting {
  id: string;
  key: string;
  value: string | null;
  category: string;
  label: string;
  field_type: string;
  sort_order: number | null;
}

const categoryConfig = {
  general: { label: "Infos générales", icon: Globe, description: "Nom, description et slogan du site" },
  contact: { label: "Coordonnées", icon: Phone, description: "Téléphone, email, adresse et horaires" },
  social: { label: "Réseaux sociaux", icon: Share2, description: "Liens vers vos réseaux sociaux" },
};

const AdminSiteSettings = () => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      toast({ title: "Erreur", description: "Impossible de charger les paramètres", variant: "destructive" });
      return;
    }
    setSettings(data || []);
    const values: Record<string, string> = {};
    data?.forEach((s) => { values[s.key] = s.value || ""; });
    setEditedValues(values);
    setLoading(false);
  };

  const handleChange = (key: string, value: string) => {
    setEditedValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (category: string) => {
    setSaving(true);
    const categorySettings = settings.filter((s) => s.category === category);
    
    let hasError = false;
    for (const setting of categorySettings) {
      const newValue = editedValues[setting.key] ?? "";
      if (newValue !== (setting.value || "")) {
        const { error } = await supabase
          .from("site_settings")
          .update({ value: newValue, updated_at: new Date().toISOString() })
          .eq("key", setting.key);
        if (error) hasError = true;
      }
    }

    if (hasError) {
      toast({ title: "Erreur", description: "Certains paramètres n'ont pas pu être sauvegardés", variant: "destructive" });
    } else {
      toast({ title: "Sauvegardé ✓", description: "Les paramètres ont été mis à jour" });
      fetchSettings();
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const renderField = (setting: Setting) => {
    const value = editedValues[setting.key] ?? "";
    if (setting.field_type === "textarea") {
      return (
        <Textarea
          value={value}
          onChange={(e) => handleChange(setting.key, e.target.value)}
          placeholder={setting.label}
          rows={3}
        />
      );
    }
    return (
      <Input
        value={value}
        onChange={(e) => handleChange(setting.key, e.target.value)}
        placeholder={setting.label}
      />
    );
  };

  return (
    <Tabs defaultValue="general">
      <TabsList className="mb-6">
        {Object.entries(categoryConfig).map(([key, config]) => {
          const Icon = config.icon;
          return (
            <TabsTrigger key={key} value={key} className="gap-2">
              <Icon className="w-4 h-4" />
              {config.label}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {Object.entries(categoryConfig).map(([categoryKey, config]) => {
        const categorySettings = settings.filter((s) => s.category === categoryKey);
        return (
          <TabsContent key={categoryKey} value={categoryKey}>
            <Card>
              <CardHeader>
                <CardTitle>{config.label}</CardTitle>
                <CardDescription>{config.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {categorySettings.map((setting) => (
                  <div key={setting.key} className="space-y-1.5">
                    <Label htmlFor={setting.key}>{setting.label}</Label>
                    {renderField(setting)}
                  </div>
                ))}
                <Button onClick={() => handleSave(categoryKey)} disabled={saving} className="mt-4">
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Enregistrer
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default AdminSiteSettings;
