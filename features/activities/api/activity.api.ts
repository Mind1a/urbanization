import { Activity, ActivityCategory, ActivityDetail } from "../types/activity.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_URBAN_API_URL;

export function getAssetUrl(path: string) {
  return `${API_BASE_URL}/static/${path}`;
}

export async function getActivityCategories(locale: string): Promise<ActivityCategory[]> {
  const res = await fetch(`${API_BASE_URL}/${locale}/api/activities/categories`);

  if (!res.ok) {
    throw new Error("Failed to fetch activity categories");
  }

  return res.json();
}

export async function getActivities(locale: string, categoryId?: number): Promise<Activity[]> {
  const query = categoryId === undefined ? "" : `?category_id=${categoryId}`;
  const res = await fetch(`${API_BASE_URL}/${locale}/api/activities/${query}`);

  if (!res.ok) {
    throw new Error("Failed to fetch activities");
  }

  return res.json();
}

export async function getActivityById(
  locale: string,
  id: string | number,
): Promise<ActivityDetail> {
  const res = await fetch(`${API_BASE_URL}/${locale}/api/activities/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch activity");
  }

  return res.json();
}
