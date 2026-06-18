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
    <section className="py-12">
      <h2 className="mb-8 text-3xl font-bold text-gray-900">Team</h2>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="w-[163px] flex-[0_0_auto] md:w-[240px] lg:w-[236px]"
            >
              <TeamCard participant={participant} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
