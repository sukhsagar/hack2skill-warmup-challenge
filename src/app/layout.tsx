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
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F8F7F2] text-[#111A15] font-sans antialiased selection:bg-[#A0F3D1]">
        {children}
      </body>
    </html>
  );
}
