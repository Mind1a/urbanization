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
