import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Radio, Calendar, Settings, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import impactTvLogo from "@/assets/impact-tv-logo.png";

interface Broadcast {
  id: string;
  title: string;
  description: string | null;
  stream_url: string | null;
  thumbnail_url: string | null;
  is_live: boolean;
  scheduled_at: string | null;
}

const ImpactTV = () => {
  const [currentBroadcast, setCurrentBroadcast] = useState<Broadcast | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchLiveBroadcast();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  const fetchLiveBroadcast = async () => {
    const { data, error } = await supabase
      .from("tv_broadcasts")
      .select("*")
      .eq("is_live", true)
      .order("created_at", { ascending: false })
      .maybeSingle();

    if (!error && data) {
      setCurrentBroadcast(data);
    }
  };

  const handlePlayStream = () => {
    if (currentBroadcast?.stream_url) {
      setIsPlaying(true);
    }
  };

  return (
    <section id="impact-tv" className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <img 
              src={impactTvLogo} 
              alt="Impact Connexion TV" 
              className="h-24 md:h-32 object-contain"
            />
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
            Diffusion en Direct
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Suivez nos émissions en direct et découvrez nos contenus exclusifs sur Impact Connexion TV.
          </p>
        </motion.div>

        {/* TV Screen */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* TV Frame */}
            <div className="bg-secondary rounded-3xl p-4 md:p-8 shadow-2xl">
              {/* Screen */}
              <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
                {isPlaying && currentBroadcast?.stream_url ? (
                  <iframe
                    src={currentBroadcast.stream_url}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-secondary to-black">
                    {/* Animated Background */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 text-center">
                      <img 
                        src={impactTvLogo} 
                        alt="Impact TV" 
                        className="h-16 md:h-20 object-contain mx-auto mb-6"
                      />
                      
                      {currentBroadcast?.is_live ? (
                        <>
                          <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                            <span className="text-primary font-semibold uppercase tracking-wider">
                              En Direct
                            </span>
                          </div>
                          <h3 className="text-white text-xl md:text-2xl font-bold mb-4">
                            {currentBroadcast.title}
                          </h3>
                          {currentBroadcast.description && (
                            <p className="text-gray-400 mb-6 max-w-md mx-auto">
                              {currentBroadcast.description}
                            </p>
                          )}
                          <Button 
                            size="lg" 
                            className="shadow-button"
                            onClick={handlePlayStream}
                          >
                            <Play className="w-5 h-5 mr-2" />
                            Regarder en Direct
                          </Button>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-center gap-2 mb-4">
                            <Radio className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-400 font-medium">
                              Hors Antenne
                            </span>
                          </div>
                          <p className="text-gray-500 mb-4">
                            Aucune diffusion en cours
                          </p>
                          <p className="text-gray-600 text-sm">
                            Revenez bientôt pour nos prochaines émissions !
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Live Indicator */}
                {currentBroadcast?.is_live && !isPlaying && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-primary px-3 py-1 rounded-full">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-white text-xs font-bold uppercase">Live</span>
                  </div>
                )}
              </div>

              {/* TV Stand */}
              <div className="flex justify-center mt-4">
                <div className="w-32 h-2 bg-gray-700 rounded-full" />
              </div>
            </div>

            {/* Admin Button */}
            {isAuthenticated && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -top-4 -right-4"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-card shadow-lg"
                  onClick={() => setShowAdmin(!showAdmin)}
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </motion.div>
            )}
          </div>

          {/* Admin Panel */}
          {showAdmin && isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <TVAdminPanel onUpdate={fetchLiveBroadcast} />
            </motion.div>
          )}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12"
        >
          {[
            {
              icon: Tv,
              title: "Émissions en Direct",
              description: "Suivez nos diffusions en temps réel"
            },
            {
              icon: Calendar,
              title: "Programmation",
              description: "Consultez notre grille de programmes"
            },
            {
              icon: Radio,
              title: "Contenus Exclusifs",
              description: "Accédez à des contenus réservés"
            }
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm"
            >
              <div className="p-3 rounded-lg bg-primary/20">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Admin Panel Component
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Plus, Trash2 } from "lucide-react";

interface TVAdminPanelProps {
  onUpdate: () => void;
}

const TVAdminPanel = ({ onUpdate }: TVAdminPanelProps) => {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newBroadcast, setNewBroadcast] = useState({
    title: "",
    description: "",
    stream_url: "",
    is_live: false
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchAllBroadcasts();
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

  const handleCreateBroadcast = async () => {
    if (!newBroadcast.title.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre est requis",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.from("tv_broadcasts").insert([newBroadcast]);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer la diffusion",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Succès",
        description: "Diffusion créée avec succès"
      });
      setNewBroadcast({ title: "", description: "", stream_url: "", is_live: false });
      fetchAllBroadcasts();
      onUpdate();
    }
    setIsLoading(false);
  };

  const handleToggleLive = async (id: string, isLive: boolean) => {
    // If turning on, turn off all others first
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
        variant: "destructive"
      });
    } else {
      fetchAllBroadcasts();
      onUpdate();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("tv_broadcasts").delete().eq("id", id);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la diffusion",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Succès",
        description: "Diffusion supprimée"
      });
      fetchAllBroadcasts();
      onUpdate();
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Paramètres de Diffusion
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* New Broadcast Form */}
        <div className="space-y-4 p-4 rounded-lg bg-muted">
          <h4 className="font-semibold flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nouvelle Diffusion
          </h4>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                placeholder="Nom de la diffusion"
                value={newBroadcast.title}
                onChange={(e) => setNewBroadcast({ ...newBroadcast, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Description de la diffusion"
                value={newBroadcast.description}
                onChange={(e) => setNewBroadcast({ ...newBroadcast, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="stream_url">URL du Stream (YouTube, Vimeo, etc.)</Label>
              <Input
                id="stream_url"
                placeholder="https://www.youtube.com/embed/..."
                value={newBroadcast.stream_url}
                onChange={(e) => setNewBroadcast({ ...newBroadcast, stream_url: e.target.value })}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Utilisez l'URL d'intégration (embed) pour YouTube ou d'autres plateformes.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="is_live"
                checked={newBroadcast.is_live}
                onCheckedChange={(checked) => setNewBroadcast({ ...newBroadcast, is_live: checked })}
              />
              <Label htmlFor="is_live">Démarrer en direct immédiatement</Label>
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
                      <p className="text-sm text-muted-foreground mt-1">{broadcast.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={broadcast.is_live}
                        onCheckedChange={(checked) => handleToggleLive(broadcast.id, checked)}
                      />
                      <Label className="text-sm">Live</Label>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(broadcast.id)}
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
      </CardContent>
    </Card>
  );
};

export default ImpactTV;
