import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Awaaz — Har Mazdoor Ki Awaaz",
  description:
    "Awaaz (हर मज़दूर की आवाज़ / ਹਰ ਮਜ਼ਦੂਰ ਦੀ ਅਵਾਜ਼) — AI-Powered Rights & Grievance Assistant for Indian delivery partners, drivers, daily-wage workers, and platform gig workers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${inter.variable}`}>
      <body className="min-h-full flex flex-col bg-[#F8F7F2] text-[#111A15] font-sans antialiased selection:bg-[#A0F3D1]">
        {children}
      </body>
    </html>
  );
}
