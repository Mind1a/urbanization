"use client";

import Image from "next/image";
import Link from "next/link";
import { useActivities } from "./hooks/useActivities";
import { getAssetUrl } from "./api/activity.api";

function formatDate(datetime: string) {
  const date = new Date(datetime);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export default function Activities() {
  const { data: activities, isLoading, isError } = useActivities();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <section className="mx-auto max-w-7xl py-20">
      <h1 className="mb-4 text-4xl font-bold">Seminars</h1>

      <p className="mb-10 max-w-4xl text-[#1E1E1E]">
        This series of seminars aims to explore architectural transformation and
        the evolution of the living environment. We will examine how the urban
        fabric transforms over time and the impact historical changes leave on
        people's daily lives.
      </p>

      <div className="flex flex-col gap-10">
        {activities?.map((activity) => (
          <div key={activity.id} className="flex gap-6">
            <div className="relative h-[200px] w-[200px] shrink-0 overflow-hidden rounded-md">
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
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
