export type TypologyReferencePart =
  | { type: "text"; text: string }
  | { type: "typology"; id: number; label: string };

export function parseTypologyReferences(text: string): TypologyReferencePart[] {
  const pattern = /\[\[\s*(\d+)\s*\|\s*([^\]]*?)\s*\]\]/g;
  const parts: TypologyReferencePart[] = [];
  let cursor = 0;

  for (const match of text.matchAll(pattern)) {
    const index = match.index;
    if (index > cursor) parts.push({ type: "text", text: text.slice(cursor, index) });
    parts.push({ type: "typology", id: Number(match[1]), label: match[2].trim() });
    cursor = index + match[0].length;
  }

  if (cursor < text.length) parts.push({ type: "text", text: text.slice(cursor) });
  return parts;
}

export function typologyPlainText(text: string) {
  return parseTypologyReferences(text)
    .map((part) => part.type === "text" ? part.text : part.label)
    .join("");
}
