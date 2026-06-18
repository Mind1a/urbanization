// features/team/components/TeamCard.tsx
import Image from "next/image";
import { Participant } from "../types/type";

const TeamCard = ({ participant }: { participant: Participant }) => {
  return (
    <article className="flex flex-col">
      <div className="relative h-[164px] w-[163px] overflow-hidden rounded-xl bg-gray-100 md:h-[248px] md:w-[240px] lg:h-[220px] lg:w-[236px]">
        <Image
          src={participant.imageSrc}
          alt={participant.name}
          fill
          sizes="(min-width: 1024px) 236px, (min-width: 768px) 240px, 163px"
          className="object-cover grayscale"
        />
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-gray-900">{participant.name}</h3>
        </div>

        {participant.profileUrl && (
          <a
            href={`mailto:${participant.profileUrl}`}
            aria-label={`Email ${participant.name}`}
            className="shrink-0 text-gray-900 transition hover:text-gray-500"
          >
            <Image
              src={"/images/about/svg/Mail.svg"}
              width={25}
              height={20}
              alt="მაილის ფოტო"
            />
          </a>
        )}

        <p className="mt-1 text-sm text-gray-500">{participant.role}</p>
      </div>
    </article>
  );
};

export default TeamCard;
