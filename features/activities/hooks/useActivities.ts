import { useQuery } from "@tanstack/react-query";
import { getActivities } from "../api/activity.api";

export function useActivities(locale: string, categoryId?: number) {
  return useQuery({
    queryKey: ["activities", locale, categoryId],
    queryFn: () => getActivities(locale, categoryId),
  });
}
