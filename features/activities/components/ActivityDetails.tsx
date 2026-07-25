"use client";

import Image from "next/image";
import localFont from "next/font/local";
import { useActivity } from "../hooks/useActivity";
import { getAssetUrl } from "../api/activity.api";

const helvetica = localFont({
  src: "../../../public/font/Helvetica.ttf",
  display: "swap",
});

function AuthorCard({
  name,
  profession,
  image,
}: {
  name: string;
  profession: string;
  image: string;
}) {
  return (
    <div className="relative h-110 w-[342px] overflow-hidden rounded-2xl md:h-auto md:w-[240px] md:rounded-[24px] xl:w-[295px]">
      <Image
        src={image}
        alt={name}
        width={416}
        height={360}
        priority
        className="h-[392px] w-full object-cover object-[center_10%] md:h-[264px] md:object-top xl:h-[448px] xl:object-center"
      />

      <div className="absolute bottom-0 left-0 w-full bg-[linear-gradient(180deg,#4A4A4A_0%,#1E1E1E_100%)] px-[20px] py-[12px] md:static md:h-[72px] md:py-0 xl:absolute xl:h-[88px] xl:py-0">
        <div className="flex h-full flex-col justify-center">
          <h3 className="text-[20px] font-bold leading-[24px] text-white md:text-[16px] md:leading-[20px] xl:text-[20px] xl:leading-[24px]">
            {name}
          </h3>

          <p className="mt-[4px] text-[16px] leading-[20px] text-white/80 md:text-[12px] md:leading-[16px] xl:text-[18px] xl:leading-[20px]">
            {profession}
          </p>
        </div>
      </div>
    </div>
  );
}

type ActivityDetailsProps = {
  id: string;
};

export default function ActivityDetails({ id }: ActivityDetailsProps) {
  const { data: activity, isLoading, isError } = useActivity(id);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !activity) return <p>Something went wrong.</p>;

  return (
    <main className={`${helvetica.className} min-h-screen bg-white`}>
      <section className="mx-auto w-[343px] py-6 md:w-[680px] xl:w-[1280px]">
        <p className="mb-3 hidden text-[14px] leading-[20px] text-[#1E1E1E99] md:block">
          Activities
          <span className="mx-2">/</span>
          <span className="text-[#1E1E1E]">{activity.title}</span>
        </p>

        <picture>
          <source media="(min-width: 1280px)" srcSet="/Rectangledesktop.svg" />

          <Image
            src={getAssetUrl(activity.img)}
            alt={activity.title}
            width={1280}
            height={472}
            priority
            className="block h-[188px] w-[343px] rounded-[16px] object-cover md:h-[364px] md:w-[680px] md:rounded-[24px] xl:h-[472px] xl:w-[1280px]"
          />
        </picture>

        <h1 className="mt-[16px] w-[342px] text-[24px] leading-[32px] text-[#1E1E1E] md:mt-[20px] md:w-[680px] md:text-[32px] md:leading-[40px] xl:mt-[36px] xl:w-[1280px] xl:text-[48px] xl:leading-[56px]">
          {activity.title}
        </h1>

        <div className="mt-[16px] flex w-[342px] flex-col gap-[8px] md:mt-[20px] md:w-[680px] md:gap-[16px] xl:mt-[36px] xl:w-[1280px]">
          <p className="text-[14px] leading-[20px] text-[#1E1E1E] md:text-[16px] md:leading-[28px] xl:text-[20px] xl:leading-[32px]">
            {activity.description}
          </p>
        </div>

        <section className="mt-[80px] w-[342px] md:mt-[88px] md:w-[680px] xl:mt-[96px] xl:w-[1280px]">
          <h2 className="text-[20px] font-bold leading-[24px] text-[#1E1E1E] md:text-[24px] md:leading-[32px] xl:text-[32px] xl:leading-[40px]">
            Biography of an Author
          </h2>

          <div className="mt-[20px] flex flex-col gap-[20px] md:hidden">
            <AuthorCard
              name={activity.author_name}
              profession={activity.author_profession}
              image={getAssetUrl(activity.author_image)}
            />

            <div className="space-y-[24px] text-[16px] leading-[26px] text-[#1E1E1E]">
              <p>{activity.author_biography}</p>
            </div>
          </div>

          <div className="mt-[20px] hidden md:block xl:hidden">
            <div className="grid grid-cols-[240px_416px] gap-x-[24px]">
              <AuthorCard
                name={activity.author_name}
                profession={activity.author_profession}
                image={getAssetUrl(activity.author_image)}
              />

              <div className="space-y-[24px] text-[18px] leading-[28px] text-[#1E1E1E]">
                <p>{activity.author_biography}</p>
              </div>
            </div>
          </div>

          <div className="mt-[36px] hidden xl:flex xl:gap-[36px]">
            <AuthorCard
              name={activity.author_name}
              profession={activity.author_profession}
              image={getAssetUrl(activity.author_image)}
            />

            <div className="w-[828px] space-y-[32px] text-[20px] leading-[32px] text-[#1E1E1E]">
              <p>{activity.author_biography}</p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
