import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "NEXUS HARDWARE LABS";
    const category = searchParams.get("category") || "High-Performance Workstation Gear";
    const price = searchParams.get("price") || "$349.00";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#09090b",
            backgroundImage:
              "radial-gradient(circle at 25px 25px, #27272a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #18181b 2%, transparent 0%)",
            backgroundSize: "100px 100px",
            padding: "60px 80px",
            color: "#fafafa",
            fontFamily: "sans-serif",
          }}
        >
          {/* Header Brand */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #6366f1, #a855f7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                ⚡
              </div>
              <span style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-0.5px" }}>
                NEXUS LABS
              </span>
            </div>
            <div
              style={{
                backgroundColor: "#27272a",
                padding: "8px 18px",
                borderRadius: "9999px",
                fontSize: "16px",
                color: "#a1a1aa",
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              {category}
            </div>
          </div>

          {/* Central Title */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "900px" }}>
            <div
              style={{
                fontSize: "56px",
                fontWeight: "900",
                letterSpacing: "-1.5px",
                lineHeight: "1.15",
                background: "linear-gradient(to right, #ffffff, #a1a1aa)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {title}
            </div>
            <div style={{ fontSize: "22px", color: "#a1a1aa", display: "flex", alignItems: "center", gap: "12px" }}>
              <span>Engineered for Ultra-Precision &amp; Minimal Latency</span>
            </div>
          </div>

          {/* Footer Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid #27272a",
              paddingTop: "30px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <span style={{ fontSize: "36px", fontWeight: "800", color: "#818cf8" }}>
                {price}
              </span>
              <span
                style={{
                  backgroundColor: "#065f46",
                  color: "#34d399",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                IN STOCK · SHIPS TODAY
              </span>
            </div>
            <div style={{ fontSize: "16px", color: "#71717a" }}>
              Next.js App Router · Edge OG Engine
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response("Failed to generate OpenGraph image", { status: 500 });
  }
}
