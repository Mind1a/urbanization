import { safeFetch } from "@/lib/apiClient";
import type { TeamMember } from "../types/memberTypes";

export const getMembers = async (locale: string): Promise<TeamMember[]> => {
  return safeFetch<TeamMember[]>(`/${locale}/api/members/`);
};
