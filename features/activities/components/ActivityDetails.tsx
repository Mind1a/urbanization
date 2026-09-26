"use client";

import Image from "next/image";
import localFont from "next/font/local";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/features/i18n/routing";
import { getAssetUrl } from "../api/activity.api";
import { useActivity } from "../hooks/useActivity";

const helvetica = localFont({
  src: "../../../public/font/Helvetica.ttf",
  display: "swap",
});

const pageContainer = "mx-auto w-full max-w-[1344px] px-4 pb-16 pt-6 sm:px-6 md:pb-20 md:pt-8 lg:px-8 xl:pb-24";
const heroShape = "relative aspect-[343/188] w-full overflow-hidden rounded-2xl bg-gray-100 sm:aspect-[16/9] lg:aspect-[1280/472] lg:rounded-3xl";
const authorLayout = "mt-5 grid min-w-0 gap-6 md:grid-cols-[minmax(200px,280px)_minmax(0,1fr)] md:items-start xl:grid-cols-[minmax(240px,295px)_minmax(0,1fr)] xl:gap-9";

function AuthorCard({
  name,
  profession,
  image,
}: {
  name: string;
  profession: string;
  image: string | null;
}) {
  if (!image) {
    return (
      <div className="w-full max-w-[360px] rounded-2xl bg-[#F3F3F3] p-5 md:max-w-none md:rounded-3xl md:p-6">
        <h3 className="text-lg font-bold leading-6 break-words text-[#1E1E1E] xl:text-xl">
          {name}
        </h3>
        <p className="mt-2 text-sm leading-5 break-words text-[#1E1E1E] xl:text-base">
          {profession}
        </p>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-2xl bg-gray-200 md:max-w-none md:rounded-3xl">
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 767px) 360px, (max-width: 1279px) 280px, 295px"
        className="object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/85 to-transparent px-5 pb-5 pt-12 text-white">
        <h3 className="text-lg font-bold leading-6 break-words xl:text-xl">
          {name}
        </h3>
        <p className="mt-1 text-sm leading-5 break-words text-white/85 xl:text-base">
          {profession}
        </p>
      </div>
    </div>
  );
}

function ActivityDetailsSkeleton() {
  return (
    <main className={`${helvetica.className} min-h-screen bg-white`}>
      <section className={`${pageContainer} animate-pulse`}>
        <div className="mb-4 h-5 w-1/2 max-w-64 rounded bg-gray-200" />
        <div className={heroShape} />
        <div className="mt-6 h-8 w-3/4 rounded bg-gray-200 md:h-12" />
        <div className="mt-6 max-w-5xl space-y-3">
          <div className="h-5 w-full rounded bg-gray-200" />
          <div className="h-5 w-full rounded bg-gray-200" />
          <div className="h-5 w-2/3 rounded bg-gray-200" />
        </div>
        <div className="mt-16 md:mt-20 xl:mt-24">
          <div className="h-8 w-56 max-w-full rounded bg-gray-200" />
          <div className={authorLayout}>
            <div className="aspect-[4/5] w-full max-w-[360px] rounded-2xl bg-gray-200 md:max-w-none md:rounded-3xl" />
            <div className="min-w-0 space-y-3">
              <div className="h-5 w-full rounded bg-gray-200" />
              <div className="h-5 w-full rounded bg-gray-200" />
              <div className="h-5 w-3/4 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

type ActivityDetailsProps = {
  id: string;
};

export default function ActivityDetails({ id }: ActivityDetailsProps) {
  const locale = useLocale();
  const { data: activity, isLoading, isError } = useActivity(locale, id);
  const t = useTranslations("activity");
  const tActivities = useTranslations("activities");

  if (isLoading) return <ActivityDetailsSkeleton />;

  if (isError || !activity) {
    return (
      <main className={`${helvetica.className} min-h-screen bg-white`}>
        <div className={pageContainer} role="alert">{t("somethingWrong")}</div>
      </main>
    );
  }

  return (
    <main className={`${helvetica.className} min-h-screen bg-white`}>
      <article className={pageContainer}>
        <nav aria-label="Breadcrumb" className="mb-4 flex min-w-0 items-center gap-2 text-sm leading-5 text-[#1E1E1E99]">
          <Link href="/activities" className="shrink-0 underline-offset-2 hover:underline">
            {tActivities("allActivities")}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="min-w-0 truncate text-[#1E1E1E]">
            {activity.title}
          </span>
        </nav>

        <div className={heroShape}>
          <Image
            src={getAssetUrl(activity.img)}
            alt={activity.title}
            fill
            priority
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 90vw, 1280px"
            className="object-cover"
          />
        </div>

        <h1 className="mt-6 text-2xl leading-8 break-words text-[#1E1E1E] md:mt-8 md:text-4xl md:leading-tight xl:text-5xl">
          {activity.title}
        </h1>

        <p className="mt-5 max-w-[1208px] whitespace-pre-line text-sm leading-6 break-words text-[#1E1E1E] md:mt-8 md:text-lg md:leading-8 xl:text-xl">
          {activity.description}
        </p>

        <section className="mt-16 md:mt-20 xl:mt-24">
          <h2 className="text-xl font-bold leading-7 text-[#1E1E1E] md:text-2xl md:leading-8 xl:text-3xl">
            {t("biography")}
          </h2>

          <div className={authorLayout}>
            <AuthorCard
              name={activity.author_name}
              profession={activity.author_profession}
              image={activity.author_image ? getAssetUrl(activity.author_image) : null}
            />
            <p className="min-w-0 whitespace-pre-line text-base leading-7 break-words text-[#1E1E1E] md:text-lg md:leading-8 xl:text-xl">
              {activity.author_biography}
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
