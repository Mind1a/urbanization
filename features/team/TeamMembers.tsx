"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { teamMembers } from "./data/teamData";
import Skeleton from "./Skeleton";

export default function TeamMembers() {
  // selectedIndex is pure React state — NOT tied to Embla's snap
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Embla is ONLY used for the draggable/scrollable thumbnail strip
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    watchDrag: true,
  });

  const selected = teamMembers[selectedIndex];

  // When clicking a thumbnail: update selectedIndex + scroll Embla to bring it into view
  const handleSelect = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  // Arrow prev/next: step selectedIndex and scroll Embla
  const handlePrev = useCallback(() => {
    const prev = Math.max(0, selectedIndex - 1);
    setSelectedIndex(prev);
    emblaApi?.scrollTo(prev);
  }, [emblaApi, selectedIndex]);

  const handleNext = useCallback(() => {
    const next = Math.min(teamMembers.length - 1, selectedIndex + 1);
    setSelectedIndex(next);
    emblaApi?.scrollTo(next);
  }, [emblaApi, selectedIndex]);







  return (
    <div
      className="px-6
      md:px-8
      xl:px-20"
    >
      <section className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between my-3 sm:my-4 lg:my-9">
          <h2 className="text-[16px] md:text-[24px] lg:text-[32px] font-bold tracking-tight text-[#1E1E1E]">
            Team Members
          </h2>
          <div className="flex items-center gap-5">
            <button
              onClick={handlePrev}
              disabled={selectedIndex === 0}
              aria-label="Previous member"
              className="flex items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Image
                alt="left arrow"
                src={"/icons/right-arrow.svg"}
                width={40}
                height={40}
                className="rotate-180 h-[40px] w-[40px]"
              />
            </button>
            <button
              onClick={handleNext}
              disabled={selectedIndex === teamMembers.length - 1}
              aria-label="Next member"
              className="flex items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Image
                alt="right arrow"
                src={"/icons/right-arrow.svg"}
                width={40}
                height={40}
                className="h-[40px] w-[40px]"
              />
            </button>
          </div>
        </div>

        {/* Selected Member Detail */}
        <div className="flex flex-col xs:flex-row gap-4 xs:gap-6 lg:gap-9 mb-11 lg:mb-12">
          {/* Photo */}
          <div className="relative h-[392px] xs:h-[336px] md:h-[400px] lg:h-[448px] w-full xs:w-[240px] md:w-[300px] lg:w-[416px] shrink-0 rounded-2xl overflow-hidden bg-gray-200">
            <Image
              src={selected.photo}
              alt={selected.name}
              fill
              className="object-cover grayscale"
              sizes="(max-width: 640px) 100vw, 224px"
            />
            <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-[#1E1E1E3D] px-5 py-3 flex items-center justify-between">
              <div>
                <p className="text-white lg:text-[20px] font-bold leading-tight">
                  {selected.name}
                </p>
                <p className="text-[#FFFFFF99] lg:text-[18px] mt-1">
                  {selected.role}
                </p>
              </div>
              <a
                href="mailto:"
                aria-label="Email"
                className="text-white hover:text-gray-300 transition-colors"
              >
                <Image
                  alt="mail"
                  src={"/icons/mail.svg"}
                  width={32}
                  height={32}
                />
              </a>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-3">
            <p className="text-[14px] sm:text-[18px] lg:text-[20px] text-[#1E1E1E]">
              <span className="text-[#1E1E1E]">Role:</span> {selected.roleFull}
            </p>
            <p className="text-[14px] sm:text-[18px] lg:text-[20px] mt-3 text-[#1E1E1E]">
              <span className="text-[#1E1E1E]">Academic rank:</span>{" "}
              {selected.academicRank}
            </p>
            <p className="text-[14px] sm:text-[18px] lg:text-[20px] text-[#1E1E1E] leading-[20px] sm:leading-[28px] sm:leading-[32px] mt-8 lg:mt-12">
              {selected.description}
            </p>
          </div>
        </div>

        {/* Embla thumbnail strip — drag to scroll, click to select */}
        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          ref={emblaRef}
        >
          <div className="flex gap-5 lg:justify-between">
            {teamMembers.map((member, index) => (
              <button
                key={member.id}
                onClick={() => handleSelect(index)}
                className="relative shrink-0 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 transition-all duration-300"
                aria-label={`Select ${member.name}`}
                style={{
                  filter: `opacity(${index === selectedIndex ? 1 : 0.4})`,
                }}
              >
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={220}
                  height={220}
                  className="object-cover rounded-2xl w-[164px] aspect-1/1 sm:w-[152px] lg:w-[236px]"
                  sizes="128px"
                />
                <div className=" bg-white/90 px-2 py-1.5 w-full">
                  <p className="text-[14px] mt-1 sm:text-[15px] lg:text-[16px] text-start font-bold text-[#1E1E1E] leading-tight truncate">
                    {member.name}
                  </p>
                  <p className="text-[12px] mt-1 sm:text-[13px] lg:text-[14px] text-start text-[#1E1E1E99] truncate">
                    {member.role}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
