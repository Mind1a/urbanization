export interface IMedia {
  id: number;
  title: string;
  datetime: string;
  img: string;
  description: string;
  link: string | null;
}

export interface IMediaItem {
  id: number;
  title: string;
  description: string;
  link: string | null;
  img: string;
}

export interface IMediaRecentResponse {
  recents: IMediaItem[];
}

export type IMediaItemResponse = [IMediaItem, IMediaRecentResponse];
