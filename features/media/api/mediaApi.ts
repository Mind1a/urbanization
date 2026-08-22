import { safeFetch } from "@/lib/apiClient";
import { IMedia, IMediaItemResponse } from "../types/mediaTypes";

export const getMedia = async (locale: string): Promise<IMedia[]> => {
  return safeFetch<IMedia[]>(`/${locale}/api/media/`);
};

export const getEachMedia = async (
  locale: string,
  id: number,
): Promise<IMediaItemResponse> => {
  return safeFetch<IMediaItemResponse>(`/${locale}/api/media/${id}`);
};
