"use client";

import { useState } from "react";
import ResultImage from "./ResultImage";
import type { ResultTimeline } from "../types/resultTypes";
import { parseTypologyReferences } from "../utils/typologyReferences";

export default function TypologyContent({ timeline }: { timeline: ResultTimeline }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const typologies = timeline.typologies ?? [];
  const selected = typologies.find((item) => item.id === selectedId);
  const panelId = `timeline-${timeline.id}-typology`;
  const headingId = `${panelId}-heading`;

  return (
    <div className="mt-8 text-sm leading-6 md:mt-10 md:text-lg md:leading-7 lg:mt-12 lg:text-xl lg:leading-8">
      <p className="whitespace-pre-line break-words">
        {parseTypologyReferences(timeline.description).map((part, index) => {
          if (part.type === "text") return part.text;
          const typology = typologies.find((item) => item.id === part.id);
          // A stale API reference stays readable without offering a broken action.
          if (!typology) return part.label;
          return (
            <button
              key={index}
              type="button"
              aria-controls={panelId}
              aria-expanded={selectedId === typology.id}
              onClick={() => setSelectedId(typology.id)}
              className={`inline cursor-pointer rounded-sm text-left text-[#ED6502] decoration-[#ED6502]/50 underline-offset-4 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ED6502] ${selectedId === typology.id ? "font-semibold underline" : ""}`}
            >
              {part.label || typology.name}
            </button>
          );
        })}
      </p>

      <section
        id={panelId}
        aria-labelledby={headingId}
        aria-live="polite"
        aria-atomic="true"
        hidden={!selected}
        className="mt-10 md:mt-12 lg:mt-14"
      >
        {selected && (
          <>
            <h2 id={headingId} className="mb-5 text-xl font-bold text-[#ED6502] md:mb-7 md:text-2xl lg:text-[28px]">
              {selected.name}
            </h2>
            <div className="flow-root" key={selected.id}>
              {selected.img && (
                <div className="mb-6 w-full md:float-left md:mb-5 md:mr-7 md:w-2/5 lg:mr-8">
                  <ResultImage
                    src={`${process.env.NEXT_PUBLIC_URBAN_API_URL?.trim().replace(/\/+$/, "")}/static/${selected.img.replace(/^\/+/, "")}`}
                    alt={selected.name}
                    sizes="(min-width: 1440px) 512px, (min-width: 1280px) calc((100vw - 160px) * 0.4), (min-width: 768px) calc((100vw - 64px) * 0.4), calc(100vw - 48px)"
                  />
                </div>
              )}
              {selected.description.split(/\r?\n\s*\r?\n/).filter((paragraph) => paragraph.trim()).map((paragraph, index) => (
                <p key={index} className="mb-5 whitespace-pre-line break-words last:mb-0 md:mb-6">{paragraph}</p>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
