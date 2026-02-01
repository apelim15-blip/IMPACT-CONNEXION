-- Add archived videos table for replay functionality
CREATE TABLE public.tv_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration TEXT,
  category TEXT DEFAULT 'general',
  views_count INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tv_videos ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view published videos" 
ON public.tv_videos 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can manage videos" 
ON public.tv_videos 
FOR ALL
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- Trigger for updated_at
CREATE TRIGGER update_tv_videos_updated_at
BEFORE UPDATE ON public.tv_videos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add schedule table for programming grid
CREATE TABLE public.tv_schedule (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  broadcast_id UUID REFERENCES public.tv_broadcasts(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tv_schedule ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view schedule" 
ON public.tv_schedule 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can manage schedule" 
ON public.tv_schedule 
FOR ALL
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);