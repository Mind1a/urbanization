import { useQuery } from "@tanstack/react-query";
import { getResults } from "../api/resultsApi";
import { ResultMenuItem } from "../types/resultTypes";

export const useResults = (locale: string) => {
    return useQuery<ResultMenuItem[], Error>({
        queryKey: ["results", locale],
        queryFn: () => getResults(locale),
    });
};
