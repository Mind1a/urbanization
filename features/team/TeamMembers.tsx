"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

import { useMembers } from "./hooks/useMembers";
import TeamMembersSkeleton from "./TeamMembersSkeleton";

const getMemberImageUrl = (img: string) => {
  return `${process.env.NEXT_PUBLIC_URBAN_API_URL}/static/${img}`;
};

export default function TeamMembers() {
  const { data: teamMembers = [], isLoading, isError } = useMembers();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    watchDrag: true,
  });

  useEffect(() => {
    if (!emblaApi || teamMembers.length === 0) return;

    emblaApi.reInit();
  }, [emblaApi, teamMembers]);

  useEffect(() => {
    if (selectedIndex > teamMembers.length - 1) {
      setSelectedIndex(0);
    }
  }, [selectedIndex, teamMembers.length]);

  const selected = teamMembers[selectedIndex];

  const handleSelect = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  const handlePrev = useCallback(() => {
    const previousIndex = Math.max(0, selectedIndex - 1);

    setSelectedIndex(previousIndex);
    emblaApi?.scrollTo(previousIndex);
  }, [emblaApi, selectedIndex]);

  const handleNext = useCallback(() => {
    const nextIndex = Math.min(teamMembers.length - 1, selectedIndex + 1);

    setSelectedIndex(nextIndex);
    emblaApi?.scrollTo(nextIndex);
  }, [emblaApi, selectedIndex, teamMembers.length]);

  if (isLoading) {
    return <TeamMembersSkeleton />;
  }

  if (isError) {
    return (
      <div className="px-6 md:px-8 xl:px-20">
        <section className="mx-auto max-w-7xl">
          <p className="py-10 text-[18px] text-red-500">
            Failed to load team members.
          </p>
        </section>
      </div>
    );
  }

  if (!selected) {
    return (
      <div className="px-6 md:px-8 xl:px-20">
        <section className="mx-auto max-w-7xl">
          <p className="py-10 text-[18px] text-[#1E1E1E]">
            No team members found.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-8 xl:px-20">
      <section className="mx-auto max-w-7xl">
        <div className="my-3 flex items-center justify-between sm:my-4 lg:my-9">
          <h2 className="text-[16px] font-bold tracking-tight text-[#1E1E1E] md:text-[24px] lg:text-[32px]">
            Team Members
          </h2>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={handlePrev}
              disabled={selectedIndex === 0}
              aria-label="Previous member"
              className="flex items-center justify-center rounded-full transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Image
                alt=""
                src="/icons/right-arrow.svg"
                width={40}
                height={40}
                className="h-[40px] w-[40px] rotate-180"
              />
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={selectedIndex === teamMembers.length - 1}
              aria-label="Next member"
              className="flex items-center justify-center rounded-full transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Image
                alt=""
                src="/icons/right-arrow.svg"
                width={40}
                height={40}
                className="h-[40px] w-[40px]"
              />
            </button>
          </div>
        </div>

        <div className="mb-11 flex flex-col gap-4 xs:flex-row xs:gap-6 lg:mb-12 lg:gap-9">
          <div className="relative h-[392px] w-full shrink-0 overflow-hidden rounded-2xl bg-gray-200 xs:h-[336px] xs:w-[240px] md:h-[400px] md:w-[300px] lg:h-[448px] lg:w-[416px]">
            <Image
              src={getMemberImageUrl(selected.img)}
              alt={`${selected.name} ${selected.surname}`}
              fill
              className="object-cover grayscale"
              sizes="(max-width: 640px) 100vw, 416px"
            />

            <div className="absolute right-0 bottom-0 left-0 flex items-center justify-between bg-[#1E1E1E3D] px-5 py-3 backdrop-blur-md">
              <div>
                <p className="font-bold leading-tight text-white lg:text-[20px]">
                  {selected.name} {selected.surname}
                </p>

                <p className="mt-1 text-[#FFFFFF99] lg:text-[18px]">
                  {selected.role_title}
                </p>
              </div>

              <a
                href={`mailto:${selected.email}`}
                aria-label={`Email ${selected.name} ${selected.surname}`}
                className="text-white transition-colors hover:text-gray-300"
              >
                <Image alt="" src="/icons/mail.svg" width={32} height={32} />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[14px] text-[#1E1E1E] sm:text-[18px] lg:text-[20px]">
              <span className="text-[#1E1E1E]">Role:</span> {selected.role}
            </p>

            <p className="mt-3 text-[14px] text-[#1E1E1E] sm:text-[18px] lg:text-[20px]">
              <span className="text-[#1E1E1E]">Academic rank:</span>{" "}
              {selected.academic_rank}
            </p>

            <p className="mt-8 text-[14px] leading-[20px] text-[#1E1E1E] sm:text-[18px] sm:leading-[32px] lg:mt-12 lg:text-[20px]">
              {selected.contribution}
            </p>
          </div>
        </div>

        <div
          ref={emblaRef}
          className="cursor-grab overflow-hidden active:cursor-grabbing"
        >
          <div className="flex gap-5 lg:justify-between">
            {teamMembers.map((member, index) => (
              <button
                key={member.id}
                type="button"
                onClick={() => handleSelect(index)}
                aria-label={`Select ${member.name} ${member.surname}`}
                aria-pressed={index === selectedIndex}
                className="relative shrink-0 overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
                style={{
                  opacity: index === selectedIndex ? 1 : 0.4,
                }}
              >
                <Image
                  src={getMemberImageUrl(member.img)}
                  alt={`${member.name} ${member.surname}`}
                  width={220}
                  height={220}
                  className="aspect-square w-[164px] rounded-2xl object-cover sm:w-[152px] lg:w-[236px]"
                  sizes="236px"
                />

                <div className="w-full bg-white/90 px-2 py-1.5">
                  <p className="mt-1 truncate text-start text-[14px] font-bold leading-tight text-[#1E1E1E] sm:text-[15px] lg:text-[16px]">
                    {member.name} {member.surname}
                  </p>

                  <p className="mt-1 truncate text-start text-[12px] text-[#1E1E1E99] sm:text-[13px] lg:text-[14px]">
                    {member.role_title}
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
