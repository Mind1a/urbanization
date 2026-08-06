import { useQuery } from "@tanstack/react-query";
import { getActivityById } from "../api/activity.api";

export function useActivity(id: string | number) {
  return useQuery({
    queryKey: ["activity", id],
    queryFn: () => getActivityById(id),
    enabled: !!id,
  });
}
