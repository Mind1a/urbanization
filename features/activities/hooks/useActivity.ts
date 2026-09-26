import { useQuery } from "@tanstack/react-query";
import { getActivityById } from "../api/activity.api";

export function useActivity(locale: string, id: string | number) {
  return useQuery({
    queryKey: ["activity", locale, id],
    queryFn: () => getActivityById(locale, id),
    enabled: !!id,
  });
}
