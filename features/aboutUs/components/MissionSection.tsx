import Image from "next/image";
import { missionBlocks } from "../data/data";
import type { MissionBlockData } from "../types/type";

const MissionSection = () => {
  return (
    <section
      aria-labelledby="mission-heading"
      className="w-full max-w-85.5 lg:max-w-7xl md:max-w-170 mx-auto lg:mt-12 md:mt-14 mt-11 "
    >
      <h2
        id="mission-heading"
        className="
          font-bold
          text-base
          md:text-2xl
          lg:text-[32px]
          leading-5
          md:leading-11
          lg:leading-10
          mb-5
          lg:mb-9
        "
      >
        Our Mission
      </h2>

      <div className="space-y-10 md:space-y-14 lg:space-y-18  ">
        {missionBlocks.map((block: MissionBlockData, index: number) => {
          const isFirstBlock = index === 0;

          if (isFirstBlock) {
            return (
              <article key={block.id} className="w-full">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start md:hidden lg:flex">
                  <Image
                    src={block.imageSrc}
                    alt={block.imageAlt}
                    width={416}
                    height={472}
                    className="shrink-0 lg:w-104 lg:h-118 md:w-60 md:h-78 w-85.5 h-75 rounded-3xl object-cover"
                  />
                  <div className="flex flex-col justify-center max-w-207 h-102 items-center gap-6 lg:gap-9 flex-1">
                    {block.paragraphs.map((paragraph, i) => (
                      <p
                        key={i}
                        className="text-sm md:text-[18px] lg:text-[20px] leading-relaxed text-[#1E1E1E]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="hidden md:grid lg:hidden grid-cols-[240px_1fr] gap-6 items-start max-w-170 w-full">
                  <p className="col-span-2 text-base leading-relaxed text-[#1E1E1E]">
                    {block.paragraphs[0]}
                  </p>

                  <Image
                    src={block.imageSrc}
                    alt={block.imageAlt}
                    width={240}
                    height={272}
                    className="w-full h-auto rounded-3xl object-cover"
                  />

                  <div className="flex flex-col gap-6">
                    {block.paragraphs.slice(1).map((paragraph, i) => (
                      <p
                        key={i}
                        className="text-base leading-relaxed text-[#1E1E1E]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            );
          }

          return (
            <article
              key={block.id}
              className={`
                flex flex-col
                md:flex-row
                lg:flex-row
                gap-6 md:gap-8 lg:gap-12
                items-start
                ${block.imagePosition === "right" ? "md:flex-row-reverse lg:flex-row-reverse" : ""}
              `}
            >
              <Image
                src={block.imageSrc}
                alt={block.imageAlt}
                width={416}
                height={472}
                className="shrink-0 w-full md:w-60 lg:w-104 h-auto rounded-3xl object-cover"
              />

              <div className="flex flex-col justify-center gap-4 md:gap-6 lg:gap-8 flex-1">
                {block.paragraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-sm md:text-base lg:text-[20px] leading-relaxed text-neutral-800"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default MissionSection;
