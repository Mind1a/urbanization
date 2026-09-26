"use client";

import Image from "next/image";
import { Link } from "@/features/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { getAssetUrl } from "./api/activity.api";
import { useActivities } from "./hooks/useActivities";
import { useActivityCategories } from "./hooks/useActivityCategories";

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

  return (
    <section className="mx-auto w-full max-w-[1344px] px-4 pb-16 pt-8 sm:px-6 md:pb-20 md:pt-10 lg:px-8 xl:pb-24">
      <h1 className="mb-6 text-3xl font-bold leading-tight break-words text-[#1E1E1E] sm:text-4xl md:mb-8 lg:text-5xl">
        {title}
      </h1>

      <nav aria-label={t("categories")} className="mb-8 flex flex-wrap gap-2 sm:gap-3 md:mb-10">
        <Link
          href="/activities"
          aria-current={categoryId === undefined ? "page" : undefined}
          className={`inline-flex min-h-11 max-w-full items-center rounded-full px-4 py-2 text-sm leading-5 break-words sm:px-5 sm:text-base ${categoryId === undefined ? "bg-[#ED6502] text-white" : "border border-[#1E1E1E]"}`}
        >
          {t("allActivities")}
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/activities/category/${category.id}`}
            aria-current={categoryId === category.id ? "page" : undefined}
            className={`inline-flex min-h-11 max-w-full items-center rounded-full px-4 py-2 text-sm leading-5 break-words sm:px-5 sm:text-base ${categoryId === category.id ? "bg-[#ED6502] text-white" : "border border-[#1E1E1E]"}`}
          >
            {category.category_name}
          </Link>
        ))}
      </nav>

      <div className="flex flex-col gap-8 md:gap-10">
        {isLoading &&
          [1, 2, 3].map((item) => (
            <div key={item} className="grid animate-pulse gap-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
              <div className="aspect-[16/10] w-full rounded-xl bg-gray-200 sm:aspect-square" />
              <div className="min-w-0 space-y-3">
                <div className="h-6 w-2/3 rounded bg-gray-200" />
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-4/5 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        {isError && <p role="alert">{t("loadError")}</p>}
        {!isLoading && !isError && activities?.length === 0 && <p>{t("empty")}</p>}
        {!isLoading && !isError && activities?.map((activity) => (
          <article key={activity.id} className="grid min-w-0 gap-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-gray-100 sm:aspect-square">
              <Image
                src={getAssetUrl(activity.img)}
                alt={activity.title}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 767px) 180px, 220px"
                className="object-cover"
              />
            </div>

            <div className="flex min-w-0 flex-col items-start">
              <div className="flex w-full min-w-0 flex-col gap-1 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
                <h2 className="min-w-0 text-xl font-bold leading-7 break-words text-[#1E1E1E] md:text-2xl md:leading-8">
                  {activity.title}
                </h2>
                <time dateTime={activity.datetime} className="shrink-0 text-sm text-[#1E1E1E99]">
                  {formatDate(activity.datetime)}
                </time>
              </div>

              <p className="mt-2 line-clamp-3 break-words text-sm leading-6 text-[#1E1E1E] sm:line-clamp-2 md:text-base">
                {activity.description}
              </p>
              <Link
                href={`/activities/${activity.id}`}
                className="mt-3 inline-flex min-h-11 items-center underline underline-offset-2"
              >
                {t("readMoreBtn")}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
