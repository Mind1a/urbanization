import AboutHero from "./AboutHero";
import { MissionSection } from "./MissionSection";

const AboutUs = () => {
  return (
    <div className="lg:mt-20 md:mt-15 mt-12 flex flex-col justify-center">
      <AboutHero />
      <MissionSection />
    </div>
  );
};

export default AboutUs;
