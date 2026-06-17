import type {
  IntroBlock,
  MissionBlockData,
  Participant,
  Project,
} from "../types/type";

export const introBlocks: IntroBlock[] = [
  {
    id: "about",
    heading: "About The Laboratory",
    body: "The Architecture and Urban Studies Laboratory (Center) at Ilia State University is dedicated to advancing architectural and urban research while strengthening the integration of research and education.",
  },
  {
    id: "collection",
    heading: "Our Collection",
    body: "The Center is a collective of researchers and professors whose activities are guided by the mission, principles, goals, and areas of focus defined in its governing statutes.",
  },
];

export const missionBlocks: MissionBlockData[] = [
  {
    id: "mission-1",
    imageSrc: "/images/about/png/Mission.png",
    imageAlt: "Archival newspaper clipping from the laboratory's collection",
    imagePosition: "left",
    paragraphs: [
      "The Architecture and Urban Studies Laboratory (Center) at Ilia State University is dedicated to advancing architectural and urban research while strengthening the integration of research and education. The Center promotes international academic standards and actively involves students in new, ongoing research projects, fostering critical thinking and hands-on engagement with contemporary urban challenges.",
      "The Center undertakes innovative and interdisciplinary research that explores the relationships between architecture, the city, and society. Its research focus includes complex urban environments, spatial and temporal formations, sustainable urban design strategies, urban history, housing, contemporary architectural practices and processes of reconstruction and rehabilitation.",
    ],
  },
  {
    id: "mission-2",
    imageSrc: "/images/about/png/Trolleybus.png",
    imageAlt: "Archival photograph of a historic tram station",
    imagePosition: "right",
    paragraphs: [
      "Grounded in current academic research, the Center contributes to the development and continuous renewal of academic programs and courses, ensuring their relevance to evolving disciplinary and societal needs.",
      "In parallel, the Center develops and maintains digital platforms and resources that support research dissemination, teaching and knowledge exchange at both national and international levels.",
    ],
  },
];

export const participants: Participant[] = [
  {
    id: "1",
    name: "Nana Zazanashvili",
    role: "Research Analyst",
    imageSrc: "/images/about/png/Participant-Nana.png",
    profileUrl: "#",
  },
  {
    id: "2",
    name: "Ia Kupatadze",
    role: "Head of the Lab",
    imageSrc: "/images/about/png/Participant-Ia.png",
    profileUrl: "#",
  },
  {
    id: "3",
    name: "Andro Mindiashvili",
    role: "Technical & GIS Specialist",
    imageSrc: "/images/about/png/Participant-Andro.png",
    profileUrl: "#",
  },
  {
    id: "4",
    name: "Ana Khitsa",
    role: "Architectural Researcher",
    imageSrc: "/images/about/png/Participant-Ana.png",
    profileUrl: "#",
  },
  {
    id: "5",
    name: "Tornike Iangu",
    role: "Architectural Researcher",
    imageSrc: "/images/about/png/Participant-Tornike.png",
    profileUrl: "#",
  },
];

export const projects: Project[] = [
  {
    id: "proj1",
    title: "First Project Title",
    description:
      "This is a sample text for the Projects section of an urban transformation website. It is intended to demonstrate how descriptive content may appear within the final design layout. The text highlights the relationship between architecture, public space, mobility, and sustainable development in contemporary cities.",
    imageSrc: "/images/about/png/Projects.png",
  },
  {
    id: "proj2",
    title: "Second Project Title",
    description:
      "This is a sample text for the Projects section of an urban transformation website. It is intended to demonstrate how descriptive content may appear within the final design layout. The text highlights the relationship between architecture, public space, mobility, and sustainable development in contemporary cities.",
    imageSrc: "/images/about/png/Projects.png",
  },
  {
    id: "proj3",
    title: "Third Project Title",
    description:
      "This is a sample text for the Projects section of an urban transformation website. It is intended to demonstrate how descriptive content may appear within the final design layout. The text highlights the relationship between architecture, public space, mobility, and sustainable development in contemporary cities.",
    imageSrc: "/images/about/png/Projects.png",
  },
];
