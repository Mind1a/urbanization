interface IArticle {
  id: number;
  src: string;
  alt: string;
  date: string;
  title: string;
  text: string;
}

export const mediaArticles: IArticle[] = [
  {
    id: 1,
    src: "/images/articles/article-1.jpg",
    alt: "Article 1",
    date: "12.05.2025",
    title: "Article title",
    text: "text",
  },
  {
    id: 2,
    src: "/images/articles/article-2.jpg",
    alt: "Article 2",
    date: "12.05.2025",
    title: "Article title",
    text: "text",
  },
  {
    id: 3,
    src: "/images/articles/article-1.jpg",
    alt: "Article 3",
    date: "12.05.2025",
    title: "Article title",
    text: "text",
  },
];
