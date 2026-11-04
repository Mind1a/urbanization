export type ResultMenuItem = {
    id: number;
    title: string;
    nav_title: string;
};

export type ResultTimeline = {
    id: number;
    img: string;
    year: number;
    description: string;
};

export type ResultDetails = Pick<ResultMenuItem, "id" | "title"> & {
    pdf: string | null;
    timelines: ResultTimeline[];
};
