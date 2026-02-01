import { useState, useEffect } from "react";
import { Settings, Save, Plus, Trash2, Video, Calendar, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

interface Broadcast {
  id: string;
  title: string;
  description: string | null;
  stream_url: string | null;
  is_live: boolean;
}

interface Video {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  thumbnail_url: string | null;
  duration: string | null;
  category: string | null;
}

interface TVAdminPanelProps {
  onUpdate: () => void;
}

const TVAdminPanel = ({ onUpdate }: TVAdminPanelProps) => {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newBroadcast, setNewBroadcast] = useState({
    title: "",
    description: "",
    stream_url: "",
    is_live: false,
  });
  const [newVideo, setNewVideo] = useState({
    title: "",
    description: "",
    video_url: "",
    thumbnail_url: "",
    duration: "",
    category: "general",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchAllBroadcasts();
    fetchAllVideos();
  }, []);

  const fetchAllBroadcasts = async () => {
    const { data, error } = await supabase
      .from("tv_broadcasts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setBroadcasts(data);
    }
  };

  const fetchAllVideos = async () => {
    const { data, error } = await supabase
      .from("tv_videos")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setVideos(data);
    }
  };

  const handleCreateBroadcast = async () => {
    if (!newBroadcast.title.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre est requis",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.from("tv_broadcasts").insert([newBroadcast]);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer la diffusion",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Succès",
        description: "Diffusion créée avec succès",
      });
      setNewBroadcast({ title: "", description: "", stream_url: "", is_live: false });
      fetchAllBroadcasts();
      onUpdate();
    }
    setIsLoading(false);
  };

  const handleCreateVideo = async () => {
    if (!newVideo.title.trim() || !newVideo.video_url.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre et l'URL sont requis",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.from("tv_videos").insert([newVideo]);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la vidéo",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Succès",
        description: "Vidéo ajoutée avec succès",
      });
      setNewVideo({
        title: "",
        description: "",
        video_url: "",
        thumbnail_url: "",
        duration: "",
        category: "general",
      });
      fetchAllVideos();
    }
    setIsLoading(false);
  };

  const handleToggleLive = async (id: string, isLive: boolean) => {
    if (isLive) {
      await supabase.from("tv_broadcasts").update({ is_live: false }).neq("id", id);
    }

    const { error } = await supabase
      .from("tv_broadcasts")
      .update({ is_live: isLive })
      .eq("id", id);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut",
        variant: "destructive",
      });
    } else {
      fetchAllBroadcasts();
      onUpdate();
    }
  };

  const handleDeleteBroadcast = async (id: string) => {
    const { error } = await supabase.from("tv_broadcasts").delete().eq("id", id);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la diffusion",
        variant: "destructive",
      });
    } else {
      toast({ title: "Succès", description: "Diffusion supprimée" });
      fetchAllBroadcasts();
      onUpdate();
    }
  };

  const handleDeleteVideo = async (id: string) => {
    const { error } = await supabase.from("tv_videos").delete().eq("id", id);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la vidéo",
        variant: "destructive",
      });
    } else {
      toast({ title: "Succès", description: "Vidéo supprimée" });
      fetchAllVideos();
    }
  };

  const categories = [
    { value: "general", label: "Général" },
    { value: "actualites", label: "Actualités" },
    { value: "divertissement", label: "Divertissement" },
    { value: "documentaire", label: "Documentaires" },
    { value: "musique", label: "Musique" },
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Administration Impact TV
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="broadcasts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="broadcasts" className="flex items-center gap-2">
              <Radio className="w-4 h-4" />
              Diffusions Live
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Archive Vidéos
            </TabsTrigger>
          </TabsList>

          {/* Broadcasts Tab */}
          <TabsContent value="broadcasts" className="space-y-6">
            {/* New Broadcast Form */}
            <div className="space-y-4 p-4 rounded-lg bg-muted">
              <h4 className="font-semibold flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nouvelle Diffusion Live
              </h4>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="broadcast-title">Titre *</Label>
                  <Input
                    id="broadcast-title"
                    placeholder="Nom de la diffusion"
                    value={newBroadcast.title}
                    onChange={(e) =>
                      setNewBroadcast({ ...newBroadcast, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="broadcast-description">Description</Label>
                  <Textarea
                    id="broadcast-description"
                    placeholder="Description de la diffusion"
                    value={newBroadcast.description}
                    onChange={(e) =>
                      setNewBroadcast({ ...newBroadcast, description: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="broadcast-url">URL du Stream</Label>
                  <Input
                    id="broadcast-url"
                    placeholder="https://www.youtube.com/embed/..."
                    value={newBroadcast.stream_url}
                    onChange={(e) =>
                      setNewBroadcast({ ...newBroadcast, stream_url: e.target.value })
                    }
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Utilisez l'URL d'intégration (embed) YouTube ou d'autres plateformes.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="broadcast-live"
                    checked={newBroadcast.is_live}
                    onCheckedChange={(checked) =>
                      setNewBroadcast({ ...newBroadcast, is_live: checked })
                    }
                  />
                  <Label htmlFor="broadcast-live">Démarrer en direct immédiatement</Label>
                </div>
                <Button onClick={handleCreateBroadcast} disabled={isLoading}>
                  <Save className="w-4 h-4 mr-2" />
                  Créer la Diffusion
                </Button>
              </div>
            </div>

            {/* Existing Broadcasts */}
            <div className="space-y-4">
              <h4 className="font-semibold">Diffusions existantes</h4>
              {broadcasts.length === 0 ? (
                <p className="text-muted-foreground text-sm">Aucune diffusion configurée</p>
              ) : (
                <div className="space-y-3">
                  {broadcasts.map((broadcast) => (
                    <div
                      key={broadcast.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-medium">{broadcast.title}</h5>
                          {broadcast.is_live && (
                            <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                              En Direct
                            </span>
                          )}
                        </div>
                        {broadcast.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {broadcast.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={broadcast.is_live}
                            onCheckedChange={(checked) =>
                              handleToggleLive(broadcast.id, checked)
                            }
                          />
                          <Label className="text-sm">Live</Label>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteBroadcast(broadcast.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-6">
            {/* New Video Form */}
            <div className="space-y-4 p-4 rounded-lg bg-muted">
              <h4 className="font-semibold flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Ajouter une Vidéo à l'Archive
              </h4>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="video-title">Titre *</Label>
                    <Input
                      id="video-title"
                      placeholder="Titre de la vidéo"
                      value={newVideo.title}
                      onChange={(e) =>
                        setNewVideo({ ...newVideo, title: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="video-category">Catégorie</Label>
                    <Select
                      value={newVideo.category}
                      onValueChange={(value) =>
                        setNewVideo({ ...newVideo, category: value })
                      }
                    >
                      <SelectTrigger id="video-category">
                        <SelectValue placeholder="Catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="video-description">Description</Label>
                  <Textarea
                    id="video-description"
                    placeholder="Description de la vidéo"
                    value={newVideo.description}
                    onChange={(e) =>
                      setNewVideo({ ...newVideo, description: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="video-url">URL de la Vidéo *</Label>
                  <Input
                    id="video-url"
                    placeholder="https://www.youtube.com/embed/..."
                    value={newVideo.video_url}
                    onChange={(e) =>
                      setNewVideo({ ...newVideo, video_url: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="video-thumbnail">URL Miniature</Label>
                    <Input
                      id="video-thumbnail"
                      placeholder="https://..."
                      value={newVideo.thumbnail_url}
                      onChange={(e) =>
                        setNewVideo({ ...newVideo, thumbnail_url: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="video-duration">Durée</Label>
                    <Input
                      id="video-duration"
                      placeholder="12:34"
                      value={newVideo.duration}
                      onChange={(e) =>
                        setNewVideo({ ...newVideo, duration: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Button onClick={handleCreateVideo} disabled={isLoading}>
                  <Save className="w-4 h-4 mr-2" />
                  Ajouter la Vidéo
                </Button>
              </div>
            </div>

            {/* Existing Videos */}
            <div className="space-y-4">
              <h4 className="font-semibold">Vidéos dans l'archive ({videos.length})</h4>
              {videos.length === 0 ? (
                <p className="text-muted-foreground text-sm">Aucune vidéo dans l'archive</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {videos.map((video) => (
                    <div
                      key={video.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        {video.thumbnail_url && (
                          <img
                            src={video.thumbnail_url}
                            alt={video.title}
                            className="w-20 h-12 object-cover rounded"
                          />
                        )}
                        <div className="min-w-0">
                          <h5 className="font-medium truncate">{video.title}</h5>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {video.category && <span>{video.category}</span>}
                            {video.duration && <span>• {video.duration}</span>}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteVideo(video.id)}
                        className="text-destructive hover:text-destructive shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TVAdminPanel;
