export interface Activity {
  id: number;
  title: string;
  datetime: string;
  img: string;
  description: string;
}

export interface ActivityCategory {
  id: number;
  category_name: string;
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
  author_image: string | null;
  author_biography: string;
}
