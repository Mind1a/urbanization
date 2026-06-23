type TeamMember = {
  id: number;
  name: string;
  role: string;
  roleFull: string;
  academicRank: string;
  description: string;
  photo: string; // path to image
};

export const teamMembers: TeamMember[] = [
  {
    id: 0,
    name: "Nana Zazanashvili",
    role: "Research and Analysis",
    roleFull: "Research and Analysis, Project Organization",
    academicRank:
      "Assistant Professor of Architecture at The School of Technology",
    description:
      "In the framework of this project, Nana Zazanashvili contributes as a core member of the research team, participating in the study of Saburtalo’s urban structure and residential building typologies. Her role includes archival research and systematization, fieldwork, analysis of collected materials, and preparation of analytical texts. She is also involved in organizing project activities, including international seminars and public presentations.",
    photo: "/images/team/nana.jpg",
  },
  {
    id: 1,
    name: "Ia Kupatadze",
    role: "Head of the Lab",
    roleFull:
      "Head of the Laboratory of Architecture and Urban Studies at Ilia State University",

    academicRank: "Professor of Urban Studies at Ilia State University",
    description:
      "Ia Kupatadze leads the laboratory, overseeing research strategy and interdisciplinary collaboration. Her expertise spans urban morphology, heritage studies, and participatory design methods applied to Soviet-era residential districts.",
    photo: "/images/team/ia.jpg",
  },
  {
    id: 2,
    name: "Andro Mindiashvili",
    role: "Technical & GIS Specialist",
    roleFull: "Serves as a Technical and GIS Specialist",

    academicRank: "Lecturer, Department of Architecture",
    description:
      "Andro Mindiashvili handles geospatial data collection, mapping, and digital modeling for the project. His technical background enables accurate spatial analysis of Saburtalo's building stock and street network.",
    photo: "/images/team/andro.jpg",
  },
  {
    id: 3,
    name: "Ana Khibia",
    role: "Architectural Researcher",
    roleFull: "Architectural Researcher",

    academicRank: "PhD Candidate, School of Architecture",
    description:
      "Ana Khibia focuses on typological classification of residential buildings and the documentation of architectural details. Her work bridges historical archival sources with contemporary fieldwork methodologies.",
    photo: "/images/team/ana.jpg",
  },
  {
    id: 4,
    name: "Tornike Iarajuli",
    role: "Architectural Researcher",
    roleFull: "Architectural Researcher",

    academicRank: "MA Student, School of Architecture",
    description:
      "Tornike Iarajuli supports fieldwork and photographic documentation across Saburtalo. He contributes to the visual archive and assists in the preparation of graphic materials for public presentations.",
    photo: "/images/team/tornike.jpg",
  },
];
