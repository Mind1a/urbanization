import { useQuery } from "@tanstack/react-query";
import { getActivities } from "../api/activity.api";

export function useActivities() {
  return useQuery({
    queryKey: ["activities"],
    queryFn: getActivities,
  });
}
