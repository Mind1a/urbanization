import { useQuery } from "@tanstack/react-query";
import { getResultDetails } from "../api/resultsApi";
import { ResultDetails } from "../types/resultTypes";

export const useResultDetails = (locale: string, id: string | number) => {
    return useQuery<ResultDetails, Error>({
        queryKey: ["result-details", locale, id],
        queryFn: () => getResultDetails(locale, id),
        enabled: Boolean(id),
    });
};
