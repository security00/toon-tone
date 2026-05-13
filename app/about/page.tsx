import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About Us | Toon-Tone",
  description: "Learn about Toon-Tone, a free unofficial cartoon color memory game built around text references and HSB color sliders.",
  alternates: { canonical: "/about/" },
  openGraph: {
    title: "About Us | Toon-Tone",
    description: "Learn about Toon-Tone, a free unofficial cartoon color memory game built around text references and HSB color sliders.",
    url: "https://toon-tone.net/about/",
    siteName: "Toon Tone",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About Us | Toon-Tone",
    description: "Learn about Toon-Tone, a free unofficial cartoon color memory game built around text references and HSB color sliders.",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#fff7ed] px-6 py-10 text-slate-950">
      <article className="mx-auto max-w-3xl rounded-[2rem] border-4 border-slate-950 bg-white p-6 shadow-[8px_8px_0_#0f172a]">
        <Link href="/" className="font-black text-pink-600">← Play Toon-Tone</Link>
        <h1 className="mt-4 text-4xl font-black">About Us</h1>
        <p className="mt-4 leading-8 text-slate-700">
          Toon-Tone is a free, browser-based cartoon color memory game. Each round gives a text-only character reference and asks players to recreate a target color using Hue, Saturation, and Brightness sliders.
        </p>
        <p className="mt-4 leading-8 text-slate-700">
          The goal is simple: make color memory feel playful, quick, and shareable without requiring downloads, accounts, or official character artwork.
        </p>
        <h2 className="mt-8 text-2xl font-black">Unofficial and text-reference-only</h2>
        <p className="mt-3 leading-8 text-slate-700">
          Toon-Tone is not affiliated with, endorsed by, or sponsored by any referenced rights holder. The MVP does not use official character images, screenshots, logos, music, or video. Character and series names appear only as text references for a memory challenge.
        </p>
        <h2 className="mt-8 text-2xl font-black">Contact</h2>
        <p className="mt-3 leading-8 text-slate-700">
          Questions, feedback, or policy requests can be sent to <a className="font-black text-pink-600" href="mailto:support@toon-tone.net">support@toon-tone.net</a>.
        </p>
      </article>
      <SiteFooter />
    </main>
  );
}
