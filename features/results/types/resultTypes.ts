export type ResultMenuItem = {
    id: number;
    title: string;
};

export type ResultTimeline = {
    id: number;
    img: string;
    year: number;
    description: string;
};

export type ResultDetails = ResultMenuItem & {
    pdf: string | null;
    timelines: ResultTimeline[];
};
