import { useQuery } from "@tanstack/react-query";
import { getEachMedia, getMedia } from "../api/mediaApi";
import { IMedia, IMediaItemResponse } from "../types/mediaTypes";

export const useMedia = () => {
  return useQuery<IMedia[], Error>({
    queryKey: ["media"],
    queryFn: getMedia,
  });
};

export const useEachMedia = (id: number) => {
  return useQuery<IMediaItemResponse, Error>({
    queryKey: ["media", `${id}`],
    queryFn: () => getEachMedia(id),
  });
};
