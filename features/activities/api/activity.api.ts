import { Activity, ActivityDetail } from "../types/activity.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_URBAN_API_URL;

export function getAssetUrl(path: string) {
  return `${API_BASE_URL}/static/${path}`;
}

export async function getActivities(): Promise<Activity[]> {
  const res = await fetch(`${API_BASE_URL}/api/activities`);

  if (!res.ok) {
    throw new Error("Failed to fetch activities");
  }

  return res.json();
}

export async function getActivityById(
  id: string | number,
): Promise<ActivityDetail> {
  const res = await fetch(`${API_BASE_URL}/api/activities/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch activity");
  }

  return res.json();
}
