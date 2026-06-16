import AboutSection from "@/features/media/AboutSection";
import Articles from "@/features/media/Articles";
import React from "react";

const page = () => {
  return (
    <div
      className="px-6
      pt-6
      md:px-8
      md:pt-8
      xl:pt-5
      xl:px-20"
    >
      <AboutSection />
      <Articles />
    </div>
  );
};

export default page;
