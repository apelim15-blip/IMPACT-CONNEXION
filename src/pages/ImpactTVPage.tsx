import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tv, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TVLivePlayer from "@/components/tv/TVLivePlayer";
import TVVideoArchive from "@/components/tv/TVVideoArchive";
import TVSchedule from "@/components/tv/TVSchedule";
import TVAdminPanel from "@/components/tv/TVAdminPanel";
import TVVideoPlayer from "@/components/tv/TVVideoPlayer";
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

interface Video {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  thumbnail_url: string | null;
  duration: string | null;
  category: string | null;
  views_count: number;
  published_at: string;
}

const ImpactTVPage = () => {
  const [currentBroadcast, setCurrentBroadcast] = useState<Broadcast | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
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

  const handleVideoSelect = async (video: Video) => {
    setSelectedVideo(video);
    // Increment view count
    await supabase
      .from("tv_videos")
      .update({ views_count: video.views_count + 1 })
      .eq("id", video.id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-dark py-12 md:py-20">
          <div className="container mx-auto px-4">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <div className="flex justify-center mb-6">
                <img 
                  src={impactTvLogo} 
                  alt="Impact Connexion TV" 
                  className="h-28 md:h-36 object-contain"
                />
              </div>
              <h1 className="font-heading font-bold text-3xl md:text-5xl text-white mb-4">
                Votre Chaîne de Télévision
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                Regardez nos émissions en direct, explorez notre archive vidéo et 
                consultez notre grille de programmes.
              </p>
            </motion.div>

            {/* Live Player */}
            <div className="max-w-5xl mx-auto relative">
              <TVLivePlayer broadcast={currentBroadcast} />
              
              {/* Admin Button */}
              {isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -top-4 -right-4 z-10"
                >
                  <Button
                    variant={showAdmin ? "default" : "outline"}
                    size="icon"
                    className="rounded-full shadow-lg"
                    onClick={() => setShowAdmin(!showAdmin)}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Admin Panel */}
        <AnimatePresence>
          {showAdmin && isAuthenticated && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-muted/50 border-y border-border overflow-hidden"
            >
              <div className="container mx-auto px-4 py-8">
                <TVAdminPanel onUpdate={fetchLiveBroadcast} />
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Content Tabs */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="archive" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-10">
                <TabsTrigger value="archive" className="text-base">
                  <Tv className="w-4 h-4 mr-2" />
                  Archive Vidéos
                </TabsTrigger>
                <TabsTrigger value="schedule" className="text-base">
                  Programmes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="archive">
                <TVVideoArchive onVideoSelect={handleVideoSelect} />
              </TabsContent>

              <TabsContent value="schedule">
                <TVSchedule />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <TVVideoPlayer
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImpactTVPage;
