export interface Activity {
  id: number;
  title: string;
  datetime: string;
  img: string;
  description: string;
}

export interface ActivityDetail {
  id: number;
  title: string;
  datetime: string;
  img: string;
  description: string;
  link: string | null;
  author_name: string;
  author_profession: string;
  author_image: string;
  author_biography: string;
}
