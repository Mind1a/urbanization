import { safeFetch } from "@/lib/apiClient";
import type { TeamMember } from "../types/memberTypes";

export const getMembers = async (): Promise<TeamMember[]> => {
  return safeFetch<TeamMember[]>("/api/members/");
};
