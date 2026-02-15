import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Calendar, MapPin, Clock, Users, ChevronRight, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addDays, format } from "date-fns";
import { fr } from "date-fns/locale";

interface Team {
  name: string;
  logo?: string;
}

interface Match {
  id: string;
  team1: Team;
  team2: Team;
  score1?: number;
  score2?: number;
  date: Date;
  time: string;
  venue: string;
  played: boolean;
}

interface Round {
  name: string;
  matches: Match[];
}

// 16 équipes participantes
const teams: Team[] = [
  { name: "FC Lions" },
  { name: "AS Panthères" },
  { name: "Étoile du Sud" },
  { name: "Dynamo FC" },
  { name: "US Tempête" },
  { name: "Racing Club" },
  { name: "FC Tonnerre" },
  { name: "AS Foudre" },
  { name: "Olympique FC" },
  { name: "SC Aigles" },
  { name: "FC Requins" },
  { name: "AS Dragons" },
  { name: "United Stars" },
  { name: "FC Cobras" },
  { name: "Real Tigres" },
  { name: "JS Gazelles" },
];

const tournamentStart = new Date(2026, 2, 1); // 1er Mars 2026

// Génération du calendrier complet
const generateRounds = (): Round[] => {
  const rounds: Round[] = [];

  // Huitièmes de finale — Jour 1 à 4 (2 matchs/jour)
  const huitiemes: Match[] = [];
  for (let i = 0; i < 8; i++) {
    const dayOffset = Math.floor(i / 2);
    huitiemes.push({
      id: `R16-${i + 1}`,
      team1: teams[i * 2],
      team2: teams[i * 2 + 1],
      date: addDays(tournamentStart, dayOffset),
      time: i % 2 === 0 ? "16:00" : "18:00",
      venue: "Terrain Municipal",
      played: false,
    });
  }
  rounds.push({ name: "Huitièmes de finale", matches: huitiemes });

  // Quarts de finale — Jour 10 à 13
  const quarts: Match[] = [];
  for (let i = 0; i < 4; i++) {
    const dayOffset = 10 + Math.floor(i / 2);
    quarts.push({
      id: `QF-${i + 1}`,
      team1: { name: `Vainqueur H${i * 2 + 1}` },
      team2: { name: `Vainqueur H${i * 2 + 2}` },
      date: addDays(tournamentStart, dayOffset),
      time: i % 2 === 0 ? "16:00" : "18:00",
      venue: "Terrain Municipal",
      played: false,
    });
  }
  rounds.push({ name: "Quarts de finale", matches: quarts });

  // Demi-finales — Jour 20 et 21
  const demis: Match[] = [];
  for (let i = 0; i < 2; i++) {
    demis.push({
      id: `SF-${i + 1}`,
      team1: { name: `Vainqueur QF${i * 2 + 1}` },
      team2: { name: `Vainqueur QF${i * 2 + 2}` },
      date: addDays(tournamentStart, 20 + i),
      time: "17:00",
      venue: "Terrain Municipal",
      played: false,
    });
  }
  rounds.push({ name: "Demi-finales", matches: demis });

  // Match pour la 3ème place — Jour 28
  rounds.push({
    name: "Petite finale",
    matches: [
      {
        id: "3RD",
        team1: { name: "Perdant DF1" },
        team2: { name: "Perdant DF2" },
        date: addDays(tournamentStart, 28),
        time: "15:00",
        venue: "Terrain Municipal",
        played: false,
      },
    ],
  });

  // Finale — Jour 30
  rounds.push({
    name: "Finale",
    matches: [
      {
        id: "FINAL",
        team1: { name: "Vainqueur DF1" },
        team2: { name: "Vainqueur DF2" },
        date: addDays(tournamentStart, 30),
        time: "17:00",
        venue: "Terrain Municipal",
        played: false,
      },
    ],
  });

  return rounds;
};

const MatchCard = ({ match, roundName }: { match: Match; roundName: string }) => {
  const isFinal = roundName === "Finale";
  const isSemiFinal = roundName === "Demi-finales";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        className={`p-4 border transition-all hover:shadow-card ${
          isFinal
            ? "border-primary bg-accent"
            : isSemiFinal
            ? "border-primary/40"
            : "border-border"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span>{format(match.date, "EEEE d MMMM", { locale: fr })}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{match.time}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Team 1 */}
          <div className="flex-1 text-right">
            <p className="font-semibold text-foreground text-sm">{match.team1.name}</p>
          </div>

          {/* Score / VS */}
          <div className="shrink-0 w-16 text-center">
            {match.played ? (
              <span className="text-lg font-bold text-foreground">
                {match.score1} - {match.score2}
              </span>
            ) : (
              <Badge variant="secondary" className="text-xs">
                VS
              </Badge>
            )}
          </div>

          {/* Team 2 */}
          <div className="flex-1 text-left">
            <p className="font-semibold text-foreground text-sm">{match.team2.name}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1 mt-3 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          <span>{match.venue}</span>
        </div>
      </Card>
    </motion.div>
  );
};

const TournamentBracket = () => {
  const rounds = generateRounds();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-secondary p-8 md:p-12 text-secondary-foreground">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative z-10 text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-2"
          >
            <Trophy className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Tournoi Maracana
          </h1>
          <p className="text-lg text-secondary-foreground/70 max-w-xl mx-auto">
            Petit Poteaux — 16 Équipes — 30 Jours de Compétition
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <Badge className="bg-primary text-primary-foreground text-sm px-4 py-1.5">
              <Calendar className="w-4 h-4 mr-1.5" />
              {format(tournamentStart, "d MMMM yyyy", { locale: fr })}
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-1.5 bg-secondary-foreground/10">
              <Users className="w-4 h-4 mr-1.5" />
              16 Équipes
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-1.5 bg-secondary-foreground/10">
              <Flame className="w-4 h-4 mr-1.5" />
              15 Matchs
            </Badge>
          </div>
        </div>
      </section>

      {/* Teams Grid */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" />
          Équipes Participantes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {teams.map((team, i) => (
            <motion.div
              key={team.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className="p-3 text-center hover:shadow-card transition-shadow border-border">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mx-auto mb-2 text-accent-foreground font-bold text-sm">
                  {i + 1}
                </div>
                <p className="font-semibold text-foreground text-sm">{team.name}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bracket Tabs */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-primary" />
          Calendrier des Matchs
        </h2>
        <Tabs defaultValue="0" className="w-full">
          <TabsList className="w-full flex-wrap h-auto gap-1 bg-muted p-1">
            {rounds.map((round, i) => (
              <TabsTrigger
                key={i}
                value={String(i)}
                className="text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {round.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {rounds.map((round, i) => (
            <TabsContent key={i} value={String(i)} className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                {round.matches.map((match) => (
                  <MatchCard key={match.id} match={match} roundName={round.name} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Bracket Visual */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-primary" />
          Arbre du Tournoi
        </h2>
        <div className="overflow-x-auto">
          <div className="flex items-start gap-6 min-w-[800px] p-4">
            {rounds.map((round, ri) => (
              <div key={ri} className="flex flex-col gap-4 flex-1">
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider text-center mb-2">
                  {round.name}
                </h3>
                <div
                  className="flex flex-col justify-around gap-4 flex-1"
                  style={{ minHeight: `${rounds[0].matches.length * 70}px` }}
                >
                  {round.matches.map((match) => (
                    <div
                      key={match.id}
                      className="bg-card border border-border rounded-lg p-2 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground truncate max-w-[100px]">
                          {match.team1.name}
                        </span>
                        <span className="text-muted-foreground">
                          {match.played ? match.score1 : "-"}
                        </span>
                      </div>
                      <div className="h-px bg-border" />
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground truncate max-w-[100px]">
                          {match.team2.name}
                        </span>
                        <span className="text-muted-foreground">
                          {match.played ? match.score2 : "-"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {/* Trophy */}
            <div className="flex flex-col items-center justify-center flex-shrink-0 min-h-[200px]">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-elevated">
                <Trophy className="w-7 h-7 text-primary-foreground" />
              </div>
              <p className="text-xs font-bold text-primary mt-2">Champion</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TournamentBracket;
