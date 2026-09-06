"use client";
import { useResultDetails } from "@/features/results/hooks/useResultDetails";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const locale = useLocale();
  const { data: result, isLoading, isError } = useResultDetails(locale, id);
  const [selectedTimelineId, setSelectedTimelineId] = useState<number | null>(null);

  if (isLoading) return <ResultPageSkeleton />;

  if (isError || !result) {
    return <p className="px-6 py-10 text-center">Failed to load result</p>;
  }

  const activeTimeline = result.timelines.find((timeline) => timeline.id === selectedTimelineId) ?? result.timelines[0];

  return (
    <div className="px-6 pt-6 md:px-8 md:pt-8 xl:pt-0 xl:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="pt-9 pb-12">
          <h2 className="font-bold text-left text-[16px] leading-5 max-w-105 lg:max-w-full md:text-[24px] md:leading-11 lg:text-[32px] lg:leading-10">
            {result.title}
          </h2>
        </div>

        {activeTimeline && (
          <Image width={1280} height={660}
            src={`${process.env.NEXT_PUBLIC_URBAN_API_URL}/static/${activeTimeline.img}`}
            alt={`${result.title} - ${activeTimeline.year}`}
            className="w-full lg:h-165 md:h-72 h-47 object-cover" />)}

        <div className="flex items-center w-full mb-9 mt-9 justify-between sm:justify-start gap-3">
          {result.timelines.map((timeline) => (
            <button
              aria-pressed={activeTimeline?.id === timeline.id}
              key={timeline.id}
              onClick={() => setSelectedTimelineId(timeline.id)}
              className={`lg:px-5.25 lg:py-3 md:py-2.5 md:px-5.75 px-5.5 py-3.5 ${activeTimeline?.id === timeline.id ? "bg-[#ED6502] text-white" : "border text-[#1E1E1E] border-[#1E1E1E]"} rounded-full cursor-pointer text-[14px] leading-5 md:text-[18px] md:leading-7 lg:text-[20px] lg:leading-6`}
            >
              {timeline.year}
            </button>
          ))}
        </div>

        <Link href="/" className="underline text-[14px] leading-5 md:text-[16px] md:leading-6 lg:leading-8 text-[#1E1E1E99]">
          Download PDF
        </Link>

        {activeTimeline && (
          <p className="text-[14px] md:text-[18px] md:leading-7 leading-5 lg:text-[20px] lg:leading-8 text-[#1E1E1E] mt-9 mb-11 lg:mt-9 max-w-302">
            {activeTimeline.description}
          </p>
        )}
      </div>
    </div>
  );
}

function ResultPageSkeleton() {
  return (
    <div className="px-6 pt-6 md:px-8 md:pt-8 xl:pt-0 xl:px-20">
      <div className="max-w-7xl mx-auto animate-pulse">
        <div className="pt-9 pb-12">
          <div className="h-5 md:h-11 lg:h-10 max-w-105 lg:max-w-2xl bg-gray-200 rounded-2xl" /></div>
        <div className="w-full lg:h-165 md:h-72 h-47 bg-gray-200 rounded-2xl" />

        <div className="flex items-center w-full mb-9 mt-6 justify-start gap-3">
          {[1, 2].map((item) => (
            <div key={item} className="rounded-full bg-gray-200 w-16 h-11" />
          ))}
        </div>

        <div className="h-5 w-24 bg-gray-200 rounded-2xl" />

        <div className="mt-6 mb-11 lg:mt-9 max-w-302 space-y-2">
          <div className="h-4 bg-gray-200 rounded-2xl w-full" />
          <div className="h-4 bg-gray-200 rounded-2xl w-full" />
          <div className="h-4 bg-gray-200 rounded-2xl w-5/6" />
          <div className="h-4 bg-gray-200 rounded-2xl w-3/4" />
        </div>
      </div>
    </div>
  );
}
