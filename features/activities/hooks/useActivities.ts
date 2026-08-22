import { useQuery } from "@tanstack/react-query";
import { getActivities } from "../api/activity.api";

export function useActivities(locale: string) {
  return useQuery({
    queryKey: ["activities", locale],
    queryFn: () => getActivities(locale),
  });
}
