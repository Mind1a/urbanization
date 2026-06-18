import AboutHero from "./AboutHero";
import MissionSection from "./MissionSection";

import { participants } from "../data/data";
import TeamSection from "./TeamSection";

const AboutUs = () => {
  return (
    <div className="lg:mt-20 md:mt-15 mt-12 flex flex-col items-center mx-auto">
      <AboutHero />
      <MissionSection />
      <TeamSection participants={participants} />
    </div>
  );
};

export default AboutUs;
