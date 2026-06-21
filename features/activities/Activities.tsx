import Image, { StaticImageData } from "next/image";

import Seminar1 from "../../public/images/activities/seminar1.png";
import Seminar2 from "../../public/images/activities/seminar2.png";
import Seminar3 from "../../public/images/activities/seminar3.png";

type SeminarCardProps = {
  image: StaticImageData;
  title: string;
  date: string;
  description: string;
  imagePosition?: string;
};

const seminars = [
  {
    image: Seminar1,
    title: "Typologies of Transformations",
    date: "12.05.2025",
    description:
      "In contemporary architectural discourse, the imperative to Reduce, Reuse, and Recycle—encompassing adaptive reuse, continual transformation, and building upon the built—fundamentally challenges inherited notions of architectural production and authorial invention. ",
  },
  {
    image: Seminar2,
    title: "Researching Housing in Different Times",
    date: "12.05.2025",
    description:
      "Housing is a lens for understanding historic change. Traditional narratives of major historic events focus on dates, people in power, and larger than life categories—of democracy, socialism, authoritarianism, modernization, etc. On the contrary, this seminar will focus on the grand historic rupture.",
  },
  {
    image: Seminar3,
    title: "My Socialist Home",
    date: "12.05.2025",
    description:
      "My Socialist Home (Iulia Statica and Adrian Catu, 2021) is a documentary that captures the lived experiences and memories of five women who lived in Bucharest's socialist housing blocks during the communist era in Romania, and who continue to live in these apartments today.",
    imagePosition: "object-left",
  },
];

const SeminarCard = ({
  image,
  title,
  date,
  description,
  imagePosition = "object-center",
}: SeminarCardProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-[12px] md:gap-[24px] lg:gap-[36px] w-full">
      <div className="relative h-[164px] md:h-[208px] lg:h-[260px] w-[342px] md:w-[240px] lg:w-[260px] overflow-hidden rounded-3xl">
        <Image
          src={image}
          fill
          alt={title}
          className={`object-cover ${imagePosition}`}
          sizes="(max-width: 768px) 342px, (max-width: 1024px) 240px, 260px"
        />
      </div>
      <div className="flex flex-col gap-[16px] max-w-[920px] w-full">
        <div className="flex justify-between">
          <h3 className="font-bold text-[15px] md:text-[20px] lg:text-2xl">
            {title}
          </h3>
          <time
            dateTime="2025-05-12"
            className="text-[#1E1E1E99] text-[14px] md:text-[18px] lg:text-xl"
          >
            {date}
          </time>
        </div>
        <p className="text-[#1E1E1ECC] text-[15px] md:text-[20px] lg:text-xl leading-5 md:leading-7 lg:leading-8">
          {description}
        </p>
        <button
          className="self-start cursor-pointer text-[15px] md:text-[18px] lg:text-xl"
          aria-label={`Read more about ${title}`}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

const Activities = () => {
  return (
    <section className="max-w-[1280px] w-full mx-auto lg:mt-[32px] lg:mb-[64px] px-4 md:px-6 lg:px-0">
      <h2 className="font-bold md:text-2xl lg:text-[32px] my-[12px] md:my-[20px] lg:my-[36px]">
        Seminars
      </h2>
      <p className="text-sm md:text-[18px] lg:text-xl leading-5 md:leading-7 lg:leading-8">
        This series of seminars aims to explore architectural transformation and
        the evolution of the living environment. We will examine how the urban
        fabric transforms over time and the impact historical changes leave on
        people&apos;s daily lives.
      </p>

      <div className="flex flex-col gap-[16px] md:gap-[24px] lg:gap-[36px] mt-[20px] md:mt-[24px] lg:mt-[36px]">
        {seminars.map((seminar) => (
          <SeminarCard
            key={seminar.title}
            image={seminar.image}
            title={seminar.title}
            date={seminar.date}
            description={seminar.description}
            imagePosition={seminar.imagePosition}
          />
        ))}
      </div>
    </section>
  );
};

export default Activities;
