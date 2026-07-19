const normalizeBaseUrl = (value: string) => value.replace(/\/$/, "");

const getBaseUrl = () => {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_URBAN_API_URL?.trim();

  if (configuredBaseUrl) {
    return normalizeBaseUrl(configuredBaseUrl);
  }

  if (typeof window !== "undefined") {
    const { protocol, hostname } = window.location;

    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:5000";
    }

    const appHostname = hostname.replace(/^www\./, "");
    const apiHostname = appHostname.startsWith("api.")
      ? appHostname
      : `api.${appHostname.replace(/^admin\./, "")}`;

    return `${protocol}//${apiHostname}`;
  }

  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:5000";
  }
  throw new Error("NEXT_PUBLIC_URBAN_API_URL is not configured.");
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
