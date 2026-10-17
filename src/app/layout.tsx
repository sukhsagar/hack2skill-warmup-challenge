import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
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
    <html lang="en" className={`h-full ${inter.variable} ${manrope.variable}`}>
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F7F8F3] text-[#17251F] font-sans antialiased selection:bg-[#B8EF43] selection:text-[#0B3328]">
        {children}
      </body>
    </html>
  );
}
