const getBaseUrl = () => {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_URBAN_API_URL?.trim();

  if (!configuredBaseUrl) {
    throw new Error("NEXT_PUBLIC_URBAN_API_URL is not configured.");
  }

  return configuredBaseUrl.replace(/\/+$/, "");
};

export async function safeFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${getBaseUrl()}${endpoint}`, {
    ...(typeof window === "undefined" ? { next: { revalidate: 300 } } : {}),
    ...options,
    signal: options.signal ?? AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    throw new ApiError(res.status);
  }
  return res.json() as Promise<T>;
}

export class ApiError extends Error {
  constructor(public readonly status: number) {
    super(`Request failed: ${status}`);
    this.name = "ApiError";
  }
}
