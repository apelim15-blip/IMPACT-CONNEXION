import { motion } from "framer-motion";
import { X, Clock, Eye, Share2, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

interface TVVideoPlayerProps {
  video: Video;
  onClose: () => void;
}

const TVVideoPlayer = ({ video, onClose }: TVVideoPlayerProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-5xl bg-card rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video Player */}
        <div className="relative aspect-video bg-black">
          <iframe
            src={video.video_url}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Video Info */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                {video.title}
              </h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {video.views_count} vues
                </span>
                <span>{formatDate(video.published_at)}</span>
                {video.duration && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {video.duration}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ThumbsUp className="w-4 h-4 mr-2" />
                J'aime
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </Button>
            </div>
          </div>

          {video.category && (
            <Badge variant="secondary" className="mb-4">
              {video.category}
            </Badge>
          )}

          {video.description && (
            <p className="text-muted-foreground">{video.description}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TVVideoPlayer;
