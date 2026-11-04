import "server-only";

import { cache } from "react";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/features/i18n/routing";
import { ApiError } from "@/lib/apiClient";
import { getMedia, getEachMedia } from "@/features/media/api/mediaApi";
import { getResultsMenu, getResultDetails } from "@/features/results/api/resultsApi";
import { getActivities, getActivityCategories, getActivityById } from "@/features/activities/api/activity.api";
import { getMembers } from "@/features/team/api/membersApi";
import { getSlider } from "@/features/landing/api/sliderApi";

export function requireLocale(locale: string): Locale {
  if (!hasLocale(routing.locales, locale)) notFound();
  return locale;
}

export function requireId(id: string) {
  if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) notFound();
  return Number(id);
}

async function contentOr404<T>(load: () => Promise<T>) {
  try {
    const content = await load();
    if (!content) notFound();
    return content;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }
}

export const loadMedia = cache(getMedia);
export const loadResults = cache(getResultsMenu);
export const loadActivities = cache(getActivities);
export const loadCategories = cache(getActivityCategories);
export const loadMembers = cache(getMembers);
export const loadSlider = cache(getSlider);
export const loadArticle = cache((locale: Locale, id: string) => {
  const numericId = requireId(id);
  return contentOr404(() => getEachMedia(locale, numericId));
});
export const loadResult = cache((locale: Locale, id: string) => {
  requireId(id);
  return contentOr404(() => getResultDetails(locale, id));
});
export const loadActivity = cache((locale: Locale, id: string) => {
  requireId(id);
  return contentOr404(() => getActivityById(locale, id));
});
export const loadCategory = cache(async (locale: Locale, id: string) => {
  const numericId = requireId(id);
  const categories = await loadCategories(locale);
  const category = categories.find((item) => item.id === numericId);
  if (!category) notFound();
  return category;
});

// Only advertise language versions that actually exist in the API.
export async function contentLocales<T>(locale: Locale, id: string, load: (locale: Locale, id: string) => Promise<T>) {
  const results = await Promise.allSettled(routing.locales.map((other) => load(other, id)));
  return routing.locales.filter((other, index) => other === locale || results[index].status === "fulfilled");
}
