import { useQuery } from "@tanstack/react-query";
import { getEachMedia, getMedia } from "../api/mediaApi";
import { IMedia, IMediaItemResponse } from "../types/mediaTypes";

export const useMedia = (locale: string) => {
  return useQuery<IMedia[], Error>({
    queryKey: ["media"],
    queryFn: () => getMedia(locale),
  });
};

export const useEachMedia = (locale: string, id: number) => {
  return useQuery<IMediaItemResponse, Error>({
    queryKey: ["media", `${id}`],
    queryFn: () => getEachMedia(locale, id),
  });
};
