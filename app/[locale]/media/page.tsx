import AboutSection from "@/features/media/AboutSection";
import Articles from "@/features/media/Articles";
import React from "react";

const page = () => {
  return (
    <div
      className="px-6
      md:px-8
      xl:px-20 mb-8 md:mb-10 lg:mb-16"
    >
      <AboutSection />
      <Articles />
    </div>
  );
};

export default page;
