import Image from "next/image";
import { missionBlocks } from "../data/data";
import type { MissionBlockData } from "../types/type";

export function MissionSection() {
  return (
    <section aria-labelledby="mission-heading" className="px-6 py-12 md:px-12">
      <h2 id="mission-heading" className="mb-10 text-2xl font-bold">
        Our Mission
      </h2>

      <div className="flex flex-col gap-16">
        {missionBlocks.map((block: MissionBlockData) => (
          <div
            key={block.id}
            className={`flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12 ${
              block.imagePosition === "right" ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className="lg:w-[300px]">
              <Image
                src={block.imageSrc}
                alt={block.imageAlt}
                width={300}
                height={400}
                className="h-auto w-full rounded-sm border border-gray-200 object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col gap-4 text-base leading-relaxed text-gray-800">
              {block.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
