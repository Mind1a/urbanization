export const PAGE_SIZE = 3;

export type PaginationSearchParams = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export function paginationHref(path: string, page: number) {
  return page > 1 ? `${path}?page=${page}` : path;
}

export function getPagination(total: number, requestedPage?: string | string[]) {
  if (requestedPage !== undefined && (typeof requestedPage !== "string" || !/^[1-9]\d*$/.test(requestedPage))) return null;
  const page = requestedPage === undefined ? 1 : Number(requestedPage);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (!Number.isSafeInteger(page) || page > totalPages) return null;
  return { page, totalPages, total, start: (page - 1) * PAGE_SIZE, end: Math.min(page * PAGE_SIZE, total) };
}

export function pageItems<T>(items: T[], page: number) {
  return items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
}

export function pageNumbers(page: number, totalPages: number): (number | "ellipsis-left" | "ellipsis-right")[] {
  const pages = new Set([1, totalPages, page - 1, page, page + 1]);
  if (page <= 3) [2, 3, 4].forEach((value) => pages.add(value));
  if (page >= totalPages - 2) [totalPages - 3, totalPages - 2, totalPages - 1].forEach((value) => pages.add(value));
  const visible = [...pages].filter((value) => value >= 1 && value <= totalPages).sort((a, b) => a - b);
  const result: ReturnType<typeof pageNumbers> = [];
  visible.forEach((value, index) => {
    if (index > 0 && value - visible[index - 1] > 1) result.push(value < page ? "ellipsis-left" : "ellipsis-right");
    result.push(value);
  });
  return result;
}
