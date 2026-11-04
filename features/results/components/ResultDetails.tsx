"use client";

import ResultImage from "@/features/results/components/ResultImage";
import { useResultDetails } from "@/features/results/hooks/useResultDetails";
import type { ResultDetails } from "@/features/results/types/resultTypes";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export default function ResultDetails({ id }: { id: string }) {
  const locale = useLocale();
  const t = useTranslations("results");
  const { data: result, isLoading, isError } = useResultDetails(locale, id);

  if (isLoading) return <ResultPageSkeleton />;

  if (isError || !result) {
    return <p className="px-6 py-10 text-center">{t("loadError")}</p>;
  }

  return <ResultContent key={`${locale}-${result.id}`} result={result} />;
}

function ResultContent({ result }: { result: ResultDetails }) {
  const t = useTranslations("results");
  const [selectedTimelineId, setSelectedTimelineId] = useState<number | null>(null);
  const activeTimeline =
    result.timelines.find((timeline) => timeline.id === selectedTimelineId) ??
    result.timelines[0];
  const imageSrc = activeTimeline?.img ? getAssetUrl(activeTimeline.img) : null;
  const imageAlt = activeTimeline ? `${result.title} — ${activeTimeline.year}` : "";
  const paragraphs =
    activeTimeline?.description
      .split(/\r?\n\s*\r?\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean) ?? [];

  return (
    <article className="px-6 pb-16 pt-6 text-[#1E1E1E] md:px-8 md:pb-24 md:pt-8 xl:px-20 xl:pt-0">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 pt-4 text-left text-xl font-bold leading-8 md:mb-12 md:pt-6 md:text-2xl md:leading-9 lg:mb-14 lg:pt-9 lg:text-[32px] lg:leading-10">
          {result.title}
        </h1>

        {imageSrc && (
          <div
            key={`map-${activeTimeline.id}`}
            className="relative aspect-[1280/660] w-full overflow-hidden rounded-xl bg-white md:rounded-3xl"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              preload={selectedTimelineId === null}
              sizes="(min-width: 1440px) 1280px, (min-width: 1280px) calc(100vw - 160px), (min-width: 768px) calc(100vw - 64px), calc(100vw - 48px)"
              className="object-contain"
            />
          </div>
        )}

        {result.timelines.length > 0 && (
          <div
            role="group"
            aria-label={t("timelineYears")}
            className="mt-6 flex flex-wrap items-center gap-3 md:mt-8 lg:mt-10"
          >
            {result.timelines.map((timeline) => (
              <button
                type="button"
                aria-pressed={activeTimeline?.id === timeline.id}
                key={timeline.id}
                onClick={() => setSelectedTimelineId(timeline.id)}
                className={`min-h-11 rounded-full border px-5 py-2.5 text-sm leading-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ED6502] md:px-6 md:text-lg md:leading-7 lg:px-7 lg:text-xl ${
                  activeTimeline?.id === timeline.id
                    ? "border-[#ED6502] bg-[#ED6502] text-white"
                    : "cursor-pointer border-[#1E1E1E] bg-white hover:border-[#ED6502] hover:text-[#ED6502]"
                }`}
              >
                {timeline.year}
              </button>
            ))}
          </div>
        )}

        {activeTimeline && (imageSrc || paragraphs.length > 0) && (
          <div
            key={`content-${activeTimeline.id}`}
            className="mt-8 flow-root text-sm leading-6 md:mt-10 md:text-lg md:leading-7 lg:mt-12 lg:text-xl lg:leading-8"
          >
            {imageSrc && (
              <div className="mb-6 w-full md:float-left md:mb-5 md:mr-7 md:w-2/5 lg:mr-8">
                <ResultImage
                  src={imageSrc}
                  alt={imageAlt}
                  sizes="(min-width: 1440px) 512px, (min-width: 1280px) calc((100vw - 160px) * 0.4), (min-width: 768px) calc((100vw - 64px) * 0.4), calc(100vw - 48px)"
                />
              </div>
            )}
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="mb-5 whitespace-pre-line break-words last:mb-0 md:mb-6"
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {result.pdf && (
          <a
            href={getAssetUrl(result.pdf)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block text-sm leading-6 text-[#1E1E1E99] underline underline-offset-4 transition-colors hover:text-[#ED6502] md:text-base lg:mt-10"
          >
            {t("downloadPdf")}
          </a>
        )}
      </div>
    </article>
  );
}

function getAssetUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_URBAN_API_URL?.trim().replace(/\/+$/, "");
  return `${baseUrl}/static/${path.replace(/^\/+/, "")}`;
}

function ResultPageSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="px-6 pb-16 pt-6 md:px-8 md:pb-24 md:pt-8 xl:px-20 xl:pt-0"
    >
      <div className="mx-auto max-w-7xl animate-pulse motion-reduce:animate-none">
        <div className="pb-8 pt-4 md:pb-12 md:pt-6 lg:pb-14 lg:pt-9">
          <div className="h-8 w-4/5 rounded-xl bg-gray-200 lg:h-10" />
        </div>
        <div className="aspect-[1280/660] w-full rounded-3xl bg-gray-200" />
        <div className="mt-6 flex gap-3 md:mt-8 lg:mt-10">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="h-11 w-20 rounded-full bg-gray-200 md:h-12 md:w-24"
            />
          ))}
        </div>
        <div className="mt-8 md:mt-10 md:flex md:gap-7 lg:mt-12 lg:gap-8">
          <div className="mb-6 aspect-[1.55] w-full shrink-0 rounded-3xl bg-gray-200 md:mb-0 md:w-2/5" />
          <div className="w-full space-y-3">
            {[1, 2, 3, 4, 5, 6].map((line) => (
              <div key={line} className="h-4 w-full rounded bg-gray-200 md:h-5" />
            ))}
          </div>
        </div>
        <div className="mt-8 h-5 w-28 rounded bg-gray-200 lg:mt-10" />
      </div>
    </div>
  );
}
