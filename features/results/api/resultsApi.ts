import { safeFetch } from "@/lib/apiClient";
import { ResultDetails, ResultMenuItem } from "../types/resultTypes";

export const getResultsMenu = async (
    locale: string
): Promise<ResultMenuItem[]> => {
    return safeFetch<ResultMenuItem[]>(`/${locale}/api/results/`);
};

export const getResultDetails = async (
    locale: string,
    id: string | number
): Promise<ResultDetails> => {
    return safeFetch<ResultDetails>(`/${locale}/api/results/${id}`);
};
