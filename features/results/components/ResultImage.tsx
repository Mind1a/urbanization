"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ResultImageProps = {
  src: string;
  alt: string;
  sizes: string;
};

export default function ResultImage({
  src,
  alt,
  sizes,
}: ResultImageProps) {
  const t = useTranslations("results");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={t("enlargeImage", { label: alt })}
        aria-haspopup="dialog"
        onClick={() => setIsOpen(true)}
        className="group relative block aspect-[1.55] w-full cursor-zoom-in overflow-hidden rounded-[18px] bg-white text-white outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#ED6502] md:rounded-3xl"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
        <span className="absolute left-4 top-4 drop-shadow-md transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0">
          <ZoomIcon />
        </span>
        <span className="absolute inset-x-0 bottom-0 flex justify-end bg-[#ED6502]/80 px-5 py-3 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
          <ZoomIcon />
        </span>
      </button>

      {isOpen && (
        <ResultImageDialog src={src} alt={alt} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}

function ZoomIcon() {
  return (
    <svg
      aria-hidden="true"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <circle cx="13" cy="13" r="10" />
      <path d="m21 21 8 8M13 8v10M8 13h10" />
    </svg>
  );
}

function ResultImageDialog({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  const t = useTranslations("results");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-label={t("enlargeImage", { label: alt })}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 m-auto max-h-none w-[calc(100%-2rem)] max-w-6xl overflow-visible border-0 bg-transparent p-0 backdrop:bg-[#EEEFF4]/80 md:w-[calc(100%-4rem)]"
    >
      <div className="relative overflow-hidden rounded-[18px] bg-white shadow-[0_20px_70px_rgba(0,0,0,0.35)] md:rounded-3xl">
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1100}
          sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1216px) calc(100vw - 64px), 1152px"
          className="h-auto max-h-[85dvh] w-full object-contain"
        />
        <button
          type="button"
          aria-label={t("closeImage")}
          onClick={onClose}
          className="absolute right-3 top-3 flex size-11 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:right-5 md:top-5 md:size-14"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="size-7 md:size-9"
          >
            <path d="m5 5 22 22M27 5 5 27" />
          </svg>
        </button>
      </div>
    </dialog>
  );
}
