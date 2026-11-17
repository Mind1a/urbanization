"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/features/i18n/routing";
import { getPagination, pageNumbers, paginationHref } from "@/lib/pagination";

export default function Pagination({ path, page, total }: {
  path: string;
  page: number;
  total: number;
}) {
  const t = useTranslations("pagination");
  const pagination = getPagination(total, String(page));
  if (!pagination || pagination.totalPages <= 1) return null;

  const control = "inline-flex h-9 w-8 shrink-0 items-center justify-center rounded-full border text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ED6502] sm:h-11 sm:w-11 sm:text-base";
  const inactive = "border-[#1E1E1E33] text-[#1E1E1E] hover:border-[#ED6502] hover:text-[#ED6502]";
  const disabled = "border-[#1E1E1E1A] text-[#1E1E1E40]";

  return (
    <nav aria-label={t("label")} className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-[#1E1E1E1A] pt-6 md:mt-12 md:flex-row md:pt-8">
      <p className="text-sm text-[#1E1E1E99] sm:text-base">
        {t("showing", { from: pagination.start + 1, to: pagination.end, total })}
      </p>
      <ul className="flex items-center gap-1 sm:gap-2">
        <li>
          {page > 1 ? (
            <Link href={paginationHref(path, page - 1)} rel="prev" aria-label={t("previous")} className={`${control} ${inactive}`}><Chevron previous /></Link>
          ) : (
            <span aria-disabled="true" aria-label={t("previous")} className={`${control} ${disabled}`}><Chevron previous /></span>
          )}
        </li>
        {pageNumbers(page, pagination.totalPages).map((value) => (
          <li key={value}>
            {typeof value === "number" ? value === page ? (
              <span aria-current="page" aria-label={t("page", { page: value })} className={`${control} border-[#ED6502] bg-[#ED6502] font-bold text-white`}>{value}</span>
            ) : (
              <Link href={paginationHref(path, value)} aria-label={t("page", { page: value })} className={`${control} ${inactive}`}>{value}</Link>
            ) : <span aria-hidden="true" className="inline-flex w-5 justify-center text-[#1E1E1E66] sm:w-7">…</span>}
          </li>
        ))}
        <li>
          {page < pagination.totalPages ? (
            <Link href={paginationHref(path, page + 1)} rel="next" aria-label={t("next")} className={`${control} ${inactive}`}><Chevron /></Link>
          ) : (
            <span aria-disabled="true" aria-label={t("next")} className={`${control} ${disabled}`}><Chevron /></span>
          )}
        </li>
      </ul>
    </nav>
  );
}

function Chevron({ previous = false }: { previous?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={`h-5 w-5 ${previous ? "rotate-180" : ""}`}><path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" /></svg>;
}
