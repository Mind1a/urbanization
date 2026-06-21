// features/team/components/TeamCard.tsx
import Image from "next/image";
import { Participant } from "../types/type";
import { useCopyEmail } from "../hooks/useCopyEmail";
const TeamCard = ({ participant }: { participant: Participant }) => {
  const { copied, handleCopy } = useCopyEmail();

  return (
    <article className="flex flex-col">
      <div className="relative h-41 w-40.75 overflow-hidden rounded-xl bg-gray-100 md:h-62 md:w-60 lg:h-55 lg:w-59">
        <Image
          src={participant.imageSrc}
          alt={participant.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="mt-1 md:mt-2 flex justify-between items-center w-full lg:max-w-59 md:max-w-60 max-w-40.75 lg:pl-3 pr-3 md:pr-2.5 lg:pr-3.75 pl-0 ">
        <div className="lg:max-w-37.5 md:max-w-46 max-w-29.75 w-full lg:h-15 md:h-12 h-10 ">
          <h3 className="font-bold lg:text-base text-[#1E1E1E] w-full md:text-[18px] text-sm ">
            {participant.name}
          </h3>
          <p className="lg:text-sm text-[12px] md:text-base text-[#1E1E1E99]">
            {participant.role}
          </p>
        </div>
        <div className="relative">
          <button
            onClick={() =>
              participant.profileUrl && handleCopy(participant.profileUrl)
            }
            aria-label={`Copy ${participant.name}'s email`}
            className="shrink-0 text-gray-900"
          >
            <Image
              src={"/images/about/svg/Mail.svg"}
              width={22}
              height={18}
              alt="მაილის ფოტო"
              className="w-5 h-4 md:w-6.25 md:h-5 lg:w-5.5 lg:h-4.5"
            />
          </button>

          {copied && (
            <div className="absolute lg:bottom-7 lg:-right-2 md:bottom-10 md:-right-2 bottom-7 -right-1 mb-2 lg:w-[150px] md:w-[210px] w-[110px] rounded-lg px-4 py-2 z-50 text-xs leading-4 text-white bg-gradient-to-r from-[rgba(30,30,30,0.95)] to-[rgba(180,180,180,0.85)] ">
              Email copied successfully
              <div className="absolute md:right-2.5 right-1.5 top-full ">
                <Image
                  src={"/images/about/svg/DownArrow.svg"}
                  alt="s"
                  width={15}
                  height={15}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default TeamCard;
