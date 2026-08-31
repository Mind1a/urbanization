import { useQuery } from "@tanstack/react-query";
import { getResultsMenu } from "../api/resultsApi";
import { ResultMenuItem } from "../types/resultTypes";

export const useResultsMenu = (locale: string) => {
    return useQuery<ResultMenuItem[], Error>({
        queryKey: ["results-menu", locale],
        queryFn: () => getResultsMenu(locale),
    });
};
