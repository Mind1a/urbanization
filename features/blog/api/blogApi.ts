import { safeFetch } from "@/lib/apiClient";
import type { Blog, BlogDetails } from "../types/blogTypes";

export const getBlogs = (locale: string) => safeFetch<Blog[]>(`/${locale}/api/blog/`);
export const getBlog = (locale: string, id: number) =>
  safeFetch<BlogDetails>(`/${locale}/api/blog/${id}`);
