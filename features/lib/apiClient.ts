const BASE_URL =
  process.env.NEXT_PUBLIC_GEOVERBS_API_URL || "http://localhost:5000";

export async function safeFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `Request failed: ${res.status}`);
  }

  return data as T;
}
