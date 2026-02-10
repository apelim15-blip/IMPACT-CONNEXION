import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AdminImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

const AdminImageUpload = ({ value, onChange, label = "Image" }: AdminImageUploadProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({ title: "Fichier invalide", description: "Veuillez sélectionner une image", variant: "destructive" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Fichier trop volumineux", description: "Maximum 5 Mo", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      onChange(urlData.publicUrl);
      toast({ title: "Image uploadée" });
    } catch (err: any) {
      toast({ title: "Erreur d'upload", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {value ? (
        <div className="relative w-full h-32 rounded-lg overflow-hidden border border-border bg-muted">
          <img src={value} alt="Aperçu" className="w-full h-full object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6"
            onClick={() => onChange("")}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      ) : (
        <div
          onClick={() => !uploading && fileRef.current?.click()}
          className="w-full h-32 rounded-lg border-2 border-dashed border-border hover:border-primary/50 bg-muted/50 flex flex-col items-center justify-center cursor-pointer transition-colors"
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          ) : (
            <>
              <ImageIcon className="w-8 h-8 text-muted-foreground mb-1" />
              <span className="text-xs text-muted-foreground">Cliquer pour uploader</span>
              <span className="text-xs text-muted-foreground">Max 5 Mo</span>
            </>
          )}
        </div>
      )}
      <Input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ou coller une URL..."
        maxLength={500}
        className="text-xs"
      />
    </div>
  );
};

export default AdminImageUpload;
