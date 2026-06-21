export interface IntroBlock {
  id: string;
  heading: string;
  body: string;
}

export interface MissionBlockData {
  id: string;
  imageSrc: string;
  imageAlt: string;
  /** Which side the image sits on at the `lg` breakpoint. Mobile/tablet always stack image-first. */
  imagePosition: "left" | "right";
  paragraphs: string[];
}

export interface Participant {
  id: string;
  name: string;
  role: string;
  imageSrc: string;
  profileUrl?: string;
}
