import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Radio, Maximize2, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
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

interface TVLivePlayerProps {
  broadcast: Broadcast | null;
}

const TVLivePlayer = ({ broadcast }: TVLivePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayStream = () => {
    if (broadcast?.stream_url) {
      setIsPlaying(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* TV Frame */}
      <div className="bg-secondary rounded-3xl p-4 md:p-6 shadow-2xl">
        {/* Screen */}
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
          {isPlaying && broadcast?.stream_url ? (
            <div className="relative w-full h-full">
              <iframe
                src={`${broadcast.stream_url}${isMuted ? '?mute=1' : ''}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {/* Player Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-white text-sm font-semibold">EN DIRECT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-secondary to-black">
              {/* Animated Background */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
              </div>
              
              {/* Content */}
              <div className="relative z-10 text-center px-4">
                <img 
                  src={impactTvLogo} 
                  alt="Impact TV" 
                  className="h-20 md:h-28 object-contain mx-auto mb-6"
                />
                
                {broadcast?.is_live ? (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                      <span className="text-primary font-semibold uppercase tracking-wider">
                        En Direct
                      </span>
                    </div>
                    <h3 className="text-white text-xl md:text-3xl font-bold mb-4">
                      {broadcast.title}
                    </h3>
                    {broadcast.description && (
                      <p className="text-gray-400 mb-6 max-w-lg mx-auto">
                        {broadcast.description}
                      </p>
                    )}
                    <Button 
                      size="lg" 
                      className="shadow-button text-lg px-8"
                      onClick={handlePlayStream}
                    >
                      <Play className="w-6 h-6 mr-2" />
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
                    <p className="text-gray-500 mb-4 text-lg">
                      Aucune diffusion en cours
                    </p>
                    <p className="text-gray-600 text-sm">
                      Consultez notre grille de programmes pour les prochaines émissions
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Live Indicator */}
          {broadcast?.is_live && !isPlaying && (
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-primary px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-white text-sm font-bold uppercase">Live</span>
            </div>
          )}
        </div>

        {/* TV Stand */}
        <div className="flex justify-center mt-4">
          <div className="w-40 h-2 bg-gray-700 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
};

export default TVLivePlayer;
