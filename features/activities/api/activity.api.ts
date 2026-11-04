import { Activity, ActivityCategory, ActivityDetail } from "../types/activity.types";
import { safeFetch } from "@/lib/apiClient";

const API_BASE_URL = process.env.NEXT_PUBLIC_URBAN_API_URL;

export function getAssetUrl(path: string) {
  return `${API_BASE_URL}/static/${path}`;
}

export async function getActivityCategories(locale: string): Promise<ActivityCategory[]> {
  return safeFetch<ActivityCategory[]>(`/${locale}/api/activities/categories`);
}

export async function getActivities(locale: string, categoryId?: number): Promise<Activity[]> {
  const query = categoryId === undefined ? "" : `?category_id=${categoryId}`;
  return safeFetch<Activity[]>(`/${locale}/api/activities/${query}`);
}

export async function getActivityById(
  locale: string,
  id: string | number,
): Promise<ActivityDetail> {
  return safeFetch<ActivityDetail>(`/${locale}/api/activities/${id}`);
}
