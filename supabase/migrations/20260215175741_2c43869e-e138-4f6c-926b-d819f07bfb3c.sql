
-- Table des équipes du tournoi
CREATE TABLE public.tournament_teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  group_name TEXT,
  seed_number INTEGER NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.tournament_teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view teams" ON public.tournament_teams
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage teams" ON public.tournament_teams
  FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

-- Table des matchs du tournoi
CREATE TABLE public.tournament_matches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  round TEXT NOT NULL, -- 'R16', 'QF', 'SF', '3RD', 'FINAL'
  match_number INTEGER NOT NULL,
  team1_id UUID REFERENCES public.tournament_teams(id),
  team2_id UUID REFERENCES public.tournament_teams(id),
  score1 INTEGER,
  score2 INTEGER,
  match_date DATE NOT NULL,
  match_time TEXT NOT NULL DEFAULT '16:00',
  venue TEXT NOT NULL DEFAULT 'Terrain Municipal',
  played BOOLEAN NOT NULL DEFAULT false,
  winner_id UUID REFERENCES public.tournament_teams(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.tournament_matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view matches" ON public.tournament_matches
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage matches" ON public.tournament_matches
  FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

-- Trigger updated_at
CREATE TRIGGER update_tournament_matches_updated_at
  BEFORE UPDATE ON public.tournament_matches
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for live score updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.tournament_matches;

-- Seed 16 teams
INSERT INTO public.tournament_teams (name, seed_number) VALUES
  ('FC Lions', 1), ('AS Panthères', 2), ('Étoile du Sud', 3), ('Dynamo FC', 4),
  ('US Tempête', 5), ('Racing Club', 6), ('FC Tonnerre', 7), ('AS Foudre', 8),
  ('Olympique FC', 9), ('SC Aigles', 10), ('FC Requins', 11), ('AS Dragons', 12),
  ('United Stars', 13), ('FC Cobras', 14), ('Real Tigres', 15), ('JS Gazelles', 16);
