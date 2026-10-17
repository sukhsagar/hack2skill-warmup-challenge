import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 font-sans">{children}</body>
    </html>
  );
}
