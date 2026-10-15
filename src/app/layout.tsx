import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { CartSheet } from "@/components/cart-sheet";
import { WebVitalsHUD } from "@/components/web-vitals-hud";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "NEXUS Hardware Labs | Responsive Fullstack E-Commerce",
  description:
    "High-performance Next.js App Router store featuring accessible Radix/shadcn primitives, persistent Zustand client state slices, and end-to-end type-safe Zod Server Actions.",
  openGraph: {
    title: "NEXUS Hardware Labs",
    description: "Responsive Accessible Component Architecture & Server Actions",
    images: [
      {
        url: "/api/og?title=NEXUS+Hardware+Labs&category=Workstation+Gear&price=$999",
        width: 1200,
        height: 630,
        alt: "Nexus Labs Dynamic OG Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXUS Hardware Labs",
    description: "Responsive Accessible Component Architecture & Server Actions",
    images: ["/api/og?title=NEXUS+Hardware+Labs&category=Workstation+Gear&price=$999"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-[hsl(var(--background))] text-[hsl(var(--foreground))] selection:bg-indigo-500/20`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <CartSheet />
          <WebVitalsHUD />
          <Toaster position="bottom-right" richColors closeButton />
          
          <footer className="border-t border-[hsl(var(--border))] py-8 mt-16 bg-[hsl(var(--card)/0.5)] text-center text-xs text-[hsl(var(--muted-foreground))]">
            <div className="container mx-auto px-4 space-y-2">
              <p className="font-semibold text-foreground">
                DJS23AMD302 · Fullstack Development with NextJs · Assignment 1
              </p>
              <p>
                RSC Architecture · Persistent Zustand State · Type-Safe Zod Server Actions · Radix Primitives
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
