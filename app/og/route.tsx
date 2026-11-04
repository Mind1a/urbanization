import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const revalidate = 86400;

export async function GET() {
  const [font, logo] = await Promise.all([
    readFile(path.join(process.cwd(), "public/font/Helvetica-Bold.ttf")),
    readFile(path.join(process.cwd(), "public/images/logo/logo.svg")),
  ]);

  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "64px 72px", background: "#f5f3ed", color: "#1e1e1e", fontFamily: "Helvetica" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {/* A data URL keeps generation independent of external image services. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/svg+xml;base64,${logo.toString("base64")}`} width={100} height={100} alt="" />
        <div style={{ display: "flex", fontSize: 24 }}>ILIA STATE UNIVERSITY</div>
      </div>
      <div style={{ display: "flex", marginTop: 66, fontSize: 90, letterSpacing: -4, lineHeight: 1 }}>SABURTALO</div>
      <div style={{ display: "flex", marginTop: 22, fontSize: 48 }}>Urban transformation</div>
      <div style={{ display: "flex", marginTop: "auto", alignItems: "center", gap: 20, fontSize: 23 }}>
        <div style={{ display: "flex", width: 64, height: 8, background: "#ed6502" }} />
        Architecture · History · Research
      </div>
    </div>,
    { width: 1200, height: 630, fonts: [{ name: "Helvetica", data: font.buffer.slice(font.byteOffset, font.byteOffset + font.byteLength) as ArrayBuffer, weight: 700, style: "normal" }] },
  );
}
