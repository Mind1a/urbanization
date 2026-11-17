export type Blog = {
  id: number;
  title: string;
  datetime: string;
  img: string;
  description: string;
  link: string;
};

export type BlogDetails = Blog & { recent: Blog[] };
