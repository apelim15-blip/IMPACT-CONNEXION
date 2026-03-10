import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SiteSettings {
  [key: string]: string;
}

const fetchSiteSettings = async (): Promise<SiteSettings> => {
  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value");

  if (error) throw error;

  const settings: SiteSettings = {};
  data?.forEach((s) => {
    settings[s.key] = s.value || "";
  });
  return settings;
};

export const useSiteSettings = () => {
  const { data: settings = {}, isLoading } = useQuery({
    queryKey: ["site_settings"],
    queryFn: fetchSiteSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  const get = (key: string, fallback: string = "") => settings[key] || fallback;

  return { settings, get, isLoading };
};
