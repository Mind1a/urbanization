import { safeFetch } from "@/lib/apiClient";
import { ResultMenuItem } from "../types/resultTypes";

export const getResults = async (locale: string): Promise<ResultMenuItem[]> => {
    return safeFetch<ResultMenuItem[]>(`/${locale}/api/results/`);
};
