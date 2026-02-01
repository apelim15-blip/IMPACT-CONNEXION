import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Radio, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { format, addDays, startOfDay, endOfDay, isSameDay, isAfter } from "date-fns";
import { fr } from "date-fns/locale";

interface ScheduleItem {
  id: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string;
  broadcast_id: string | null;
}

const TVSchedule = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSchedule();
  }, [selectedDate]);

  const fetchSchedule = async () => {
    setIsLoading(true);
    const dayStart = startOfDay(selectedDate).toISOString();
    const dayEnd = endOfDay(selectedDate).toISOString();

    const { data, error } = await supabase
      .from("tv_schedule")
      .select("*")
      .gte("start_time", dayStart)
      .lte("start_time", dayEnd)
      .order("start_time", { ascending: true });

    if (!error && data) {
      setSchedule(data);
    }
    setIsLoading(false);
  };

  const days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  const isCurrentProgram = (item: ScheduleItem) => {
    const now = new Date();
    const start = new Date(item.start_time);
    const end = new Date(item.end_time);
    return now >= start && now <= end;
  };

  const isUpcoming = (item: ScheduleItem) => {
    return isAfter(new Date(item.start_time), new Date());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <Calendar className="w-6 h-6 text-primary" />
          Grille des Programmes
        </h3>
      </div>

      {/* Day Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={() => setSelectedDate(addDays(selectedDate, -1))}
          disabled={isSameDay(selectedDate, new Date())}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="flex gap-2">
          {days.map((day) => (
            <Button
              key={day.toISOString()}
              variant={isSameDay(day, selectedDate) ? "default" : "outline"}
              className="shrink-0 flex-col h-auto py-2 px-4"
              onClick={() => setSelectedDate(day)}
            >
              <span className="text-xs uppercase">
                {format(day, "EEE", { locale: fr })}
              </span>
              <span className="text-lg font-bold">{format(day, "d")}</span>
              <span className="text-xs">{format(day, "MMM", { locale: fr })}</span>
            </Button>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={() => setSelectedDate(addDays(selectedDate, 1))}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Schedule List */}
      <div className="space-y-3">
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="bg-card rounded-lg p-4 animate-pulse">
              <div className="flex gap-4">
                <div className="w-20 h-6 bg-muted rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-muted rounded w-1/3" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              </div>
            </div>
          ))
        ) : schedule.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Aucun programme prévu pour cette date</p>
            <p className="text-sm text-muted-foreground mt-2">
              Revenez bientôt pour découvrir notre programmation
            </p>
          </div>
        ) : (
          schedule.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`relative bg-card rounded-lg p-4 border transition-all ${
                isCurrentProgram(item)
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex gap-4">
                {/* Time */}
                <div className="shrink-0 text-center">
                  <div className="text-lg font-bold text-foreground">
                    {format(new Date(item.start_time), "HH:mm")}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(item.end_time), "HH:mm")}
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px bg-border relative">
                  {isCurrentProgram(item) && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full animate-pulse" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    {isCurrentProgram(item) && (
                      <Badge className="shrink-0 bg-primary text-primary-foreground">
                        <Radio className="w-3 h-3 mr-1 animate-pulse" />
                        En cours
                      </Badge>
                    )}
                    {!isCurrentProgram(item) && isUpcoming(item) && (
                      <Badge variant="secondary" className="shrink-0">
                        <Clock className="w-3 h-3 mr-1" />
                        À venir
                      </Badge>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default TVSchedule;
