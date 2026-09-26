"use client";

import Image from "next/image";
import { Link } from "@/features/i18n/routing";
import { useActivities } from "./hooks/useActivities";
import { useActivityCategories } from "./hooks/useActivityCategories";
import { getAssetUrl } from "./api/activity.api";
import { useLocale, useTranslations } from "next-intl";

function formatDate(datetime: string) {
  const date = new Date(datetime);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

type ActivitiesProps = {
  categoryId?: number;
  categoryName?: string;
};

export default function Activities({ categoryId, categoryName }: ActivitiesProps) {
  const locale = useLocale();
  const t = useTranslations("activities");
  const { data: activities, isLoading, isError } = useActivities(locale, categoryId);
  const { data: categories = [] } = useActivityCategories(locale);
  const title = categoryName ?? t("allActivities");

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl py-20">
        <h1 className="mb-10 text-4xl font-bold">{title}</h1>

        <div className="flex flex-col gap-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-6">
              <div className="h-[200px] w-[200px] shrink-0 animate-pulse rounded-md bg-gray-200" />

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between">
                  <div className="h-[24px] w-1/2 animate-pulse rounded bg-gray-200" />
                  <div className="h-[16px] w-[80px] animate-pulse rounded bg-gray-200" />
                </div>

                <div className="mt-2 space-y-2">
                  <div className="h-[16px] w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-[16px] w-3/4 animate-pulse rounded bg-gray-200" />
                </div>

                <div className="mt-2 h-[16px] w-[80px] animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  if (isError) return <p>{t("loadError")}</p>;

  return (
    <section className="mx-auto max-w-7xl mb-[100px]">
      <h1 className="py-9 text-4xl font-bold">{title}</h1>

      <nav aria-label={t("categories")} className="mb-10 flex flex-wrap gap-3">
        <Link
          href="/activities"
          aria-current={categoryId === undefined ? "page" : undefined}
          className={`rounded-full px-5 py-2 ${categoryId === undefined ? "bg-[#ED6502] text-white" : "border border-[#1E1E1E]"}`}
        >
          {t("allActivities")}
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/activities/category/${category.id}`}
            aria-current={categoryId === category.id ? "page" : undefined}
            className={`rounded-full px-5 py-2 ${categoryId === category.id ? "bg-[#ED6502] text-white" : "border border-[#1E1E1E]"}`}
          >
            {category.category_name}
          </Link>
        ))}
      </nav>

      <div className="flex flex-col gap-10">
        {activities?.length === 0 && <p>{t("empty")}</p>}
        {activities?.map((activity) => (
          <div key={activity.id} className="flex gap-6">
            <div className="relative h-50 w-50 shrink-0 overflow-hidden rounded-md">
              <Image
                src={getAssetUrl(activity.img)}
                alt={activity.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-bold">{activity.title}</h2>
                <span className="whitespace-nowrap text-sm text-[#1E1E1E99]">
                  {formatDate(activity.datetime)}
                </span>
              </div>

              <p className="mt-2 line-clamp-2 text-[#1E1E1E]">
                {activity.description}
              </p>

              <Link
                href={`/activities/${activity.id}`}
                className="mt-2 w-fit underline"
              >
                {t("readMoreBtn")}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
