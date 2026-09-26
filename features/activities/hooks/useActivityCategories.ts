import { useQuery } from "@tanstack/react-query";
import { getActivityCategories } from "../api/activity.api";

export function useActivityCategories(locale: string) {
  return useQuery({
    queryKey: ["activity-categories", locale],
    queryFn: () => getActivityCategories(locale),
  });
}
