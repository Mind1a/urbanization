export interface IMedia {
  id: number;
  title: string;
  datetime: string;
  img: string;
  description: string;
  link: string | null;
}

export interface IMediaItemResponse extends IMedia {
  recent: IMedia[];
}
