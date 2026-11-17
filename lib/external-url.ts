// API links may be bare domains. Only HTTP(S) links can become navigable URLs.
export function externalUrl(value: string | null | undefined) {
  const input = value?.trim();
  if (!input) return undefined;
  try {
    const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(input) ? input : `https://${input}`);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || !url.hostname.includes(".")) return undefined;
    return url.href;
  } catch {
    return undefined;
  }
}
