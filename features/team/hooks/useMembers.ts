import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../api/membersApi";
import type { TeamMember } from "../types/memberTypes";

export const useMembers = (locale: string) => {
  return useQuery<TeamMember[], Error>({
    queryKey: ["members", locale],
    queryFn: () => getMembers(locale),
  });
};
