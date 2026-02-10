import { useState, useRef } from "react";
import { X, Loader2, Image as ImageIcon, Plus, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AdminImageGalleryProps {
  images: string[];
  onChange: (images: string[]) => void;
  label?: string;
}

const AdminImageGallery = ({ images, onChange, label = "Galerie d'images" }: AdminImageGalleryProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const invalid = files.find(f => !f.type.startsWith("image/"));
    if (invalid) {
      toast({ title: "Fichier invalide", description: "Seules les images sont acceptées", variant: "destructive" });
      return;
    }

    const tooLarge = files.find(f => f.size > 5 * 1024 * 1024);
    if (tooLarge) {
      toast({ title: "Fichier trop volumineux", description: "Maximum 5 Mo par image", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of files) {
        const ext = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
        const { error } = await supabase.storage.from("product-images").upload(fileName, file, { cacheControl: "3600", upsert: false });
        if (error) throw error;
        const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName);
        uploaded.push(urlData.publicUrl);
      }
      onChange([...images, ...uploaded]);
      toast({ title: `${uploaded.length} image(s) uploadée(s)` });
    } catch (err: any) {
      toast({ title: "Erreur d'upload", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const addUrl = () => {
    if (urlInput.trim()) {
      onChange([...images, urlInput.trim()]);
      setUrlInput("");
    }
  };

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return;
    const updated = [...images];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((url, i) => (
            <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-border bg-muted">
              <img src={url} alt={`Image ${i + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                {i > 0 && (
                  <Button type="button" variant="secondary" size="icon" className="h-6 w-6" onClick={() => moveImage(i, i - 1)}>
                    ←
                  </Button>
                )}
                {i < images.length - 1 && (
                  <Button type="button" variant="secondary" size="icon" className="h-6 w-6" onClick={() => moveImage(i, i + 1)}>
                    →
                  </Button>
                )}
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(i)}
              >
                <X className="w-3 h-3" />
              </Button>
              {i === 0 && (
                <span className="absolute bottom-1 left-1 text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded font-medium">
                  Principal
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <div
        onClick={() => !uploading && fileRef.current?.click()}
        className="w-full h-20 rounded-lg border-2 border-dashed border-border hover:border-primary/50 bg-muted/50 flex flex-col items-center justify-center cursor-pointer transition-colors"
      >
        {uploading ? (
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
        ) : (
          <>
            <Plus className="w-5 h-5 text-muted-foreground mb-0.5" />
            <span className="text-xs text-muted-foreground">Ajouter des images (max 5 Mo)</span>
          </>
        )}
      </div>

      <Input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        className="hidden"
      />

      <div className="flex gap-2">
        <Input
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Ou coller une URL..."
          maxLength={500}
          className="text-xs"
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
        />
        <Button type="button" variant="outline" size="sm" onClick={addUrl} disabled={!urlInput.trim()}>
          <Plus className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default AdminImageGallery;
