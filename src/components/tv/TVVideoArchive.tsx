import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Clock, Eye, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface TVVideoArchiveProps {
  onVideoSelect: (video: Video) => void;
}

const TVVideoArchive = ({ onVideoSelect }: TVVideoArchiveProps) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { value: "all", label: "Toutes les catégories" },
    { value: "general", label: "Général" },
    { value: "actualites", label: "Actualités" },
    { value: "divertissement", label: "Divertissement" },
    { value: "documentaire", label: "Documentaires" },
    { value: "musique", label: "Musique" },
  ];

  useEffect(() => {
    fetchVideos();
  }, [selectedCategory]);

  const fetchVideos = async () => {
    setIsLoading(true);
    let query = supabase
      .from("tv_videos")
      .select("*")
      .order("published_at", { ascending: false });

    if (selectedCategory !== "all") {
      query = query.eq("category", selectedCategory);
    }

    const { data, error } = await query;

    if (!error && data) {
      setVideos(data);
    }
    setIsLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <Play className="w-6 h-6 text-primary" />
          Archive Vidéos
        </h3>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[200px] bg-card border-border">
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

      {/* Video Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-card rounded-xl overflow-hidden animate-pulse">
              <div className="aspect-video bg-muted" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-12">
          <Play className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Aucune vidéo disponible</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all cursor-pointer"
              onClick={() => onVideoSelect(video)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-muted overflow-hidden">
                {video.thumbnail_url ? (
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary">
                    <Play className="w-12 h-12 text-primary/50" />
                  </div>
                )}
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  </div>
                </div>
                {/* Duration Badge */}
                {video.duration && (
                  <Badge className="absolute bottom-2 right-2 bg-black/80 text-white">
                    <Clock className="w-3 h-3 mr-1" />
                    {video.duration}
                  </Badge>
                )}
              </div>
              {/* Info */}
              <div className="p-4">
                <h4 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h4>
                {video.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {video.description}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatDate(video.published_at)}</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {video.views_count} vues
                  </span>
                </div>
                {video.category && (
                  <Badge variant="secondary" className="mt-2">
                    {video.category}
                  </Badge>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TVVideoArchive;
