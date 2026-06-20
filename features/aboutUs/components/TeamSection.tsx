"use client";

import useEmblaCarousel from "embla-carousel-react";

import { Participant } from "../types/type";
import TeamCard from "./TeamCard";

const TeamSection = ({ participants }: { participants: Participant[] }) => {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  return (
    <section className="overflow-hidden py-12 lg:max-w-7xl md:max-w-178 max-w-91.5 w-full">
      <h2 className="mb-6 lg:mb-8 lg:text-[32px] text-base md:text-2xl font-bold text-[#1E1E1E]">
        Team
      </h2>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">
          {participants.map((participant) => (
            <div key={participant.id} className="">
              <TeamCard participant={participant} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
