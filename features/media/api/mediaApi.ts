import { safeFetch } from "@/lib/apiClient";
import { IMedia, IMediaItemResponse } from "../types/mediaTypes";

export const getMedia = async (): Promise<IMedia[]> => {
  return safeFetch<IMedia[]>("/api/media/");
};

export const getEachMedia = async (id: number): Promise<IMediaItemResponse> => {
  return safeFetch<IMediaItemResponse>(`/api/media/${id}`);
};
