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
  metadataBase: new URL("https://toon-tone.net"),
  title: "Toon-Tone Game | Cartoon Color Guessing Challenge",
  description:
    "Play Toon-Tone, a free cartoon color guessing game. Match character colors from memory with Hue, Saturation, and Brightness sliders, then share your daily score.",
  keywords: [
    "toon tone game",
    "cartoon color guessing game",
    "guess cartoon character color",
    "character color game",
    "anime color guessing game",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Toon-Tone Game",
    description: "Guess cartoon character colors with HSB sliders and share your Daily Challenge score.",
    url: "https://toon-tone.net",
    siteName: "Toon-Tone",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#fff7ed] text-slate-950">{children}</body>
    </html>
  );
}
