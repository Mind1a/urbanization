import { useQuery } from "@tanstack/react-query";
import { getActivityById } from "../api/activity.api";

export function useActivity(locale: string, id: string | number) {
  return useQuery({
    queryKey: ["activity", id],
    queryFn: () => getActivityById(locale, id),
    enabled: !!id,
  });
}
