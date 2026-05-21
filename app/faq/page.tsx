import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import { openGraphImage, SITE_URL, twitterImage } from "@/lib/seo";

const faqItems = [
  ["What is Toon Tone?", "Toon Tone is a browser color memory game where you match cartoon, anime, superhero, movie, and game character colors from memory with HSB sliders."],
  ["Is Toon Tone free?", "Yes. Toon Tone is free to play in a modern browser without login, downloads, or payment."],
  ["What is Toon Tone Anime?", "Toon Tone Anime is the anime-inspired part of the game, focused on matching memorable anime-style colors such as hair, outfits, bows, cheeks, and accessories."],
  ["Is Toon Tone the same as Teen Tone Game?", "No. The site name is Toon Tone. Some searches may misspell it as Teen Tone Game, but the official browser game is Toon Tone."],
  ["Does Toon Tone use official images?", "No. The MVP uses text references and abstract color UI only. It does not use official character images, screenshots, logos, audio, or video."],
  ["How does scoring work?", "Each round compares your selected color with the hidden target color and converts the visual distance into a 0-10 score."],
  ["Can I play Toon Tone on mobile?", "Yes. Toon Tone works on modern mobile and desktop browsers, with sliders designed for touch and mouse input."],
  ["Can I share my Toon Tone score?", "Yes. After the daily challenge, you can share text or download a PNG score card."],
];

export const metadata: Metadata = {
  title: "Toon Tone FAQ | Game, Anime Mode, Scoring, and Safety",
  description: "Read the Toon Tone FAQ for gameplay, Toon Tone Anime, scoring, mobile support, sharing, and text-reference-only safety details.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Toon Tone FAQ",
    description: "Answers about Toon Tone gameplay, Toon Tone Anime, scoring, mobile support, sharing, and text-reference-only safety.",
    url: `${SITE_URL}/faq`,
    siteName: "Toon Tone",
    images: [openGraphImage],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Toon Tone FAQ",
    description: "Answers about Toon Tone gameplay, Toon Tone Anime, scoring, mobile support, sharing, and safety.",
    images: [twitterImage],
  },
};

export default function Page() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <main className="min-h-screen bg-[#fff7ed] px-6 py-10 text-slate-950">
      <JsonLd data={faqJsonLd} />
      <article className="mx-auto max-w-4xl rounded-[2rem] border-4 border-slate-950 bg-white p-6 shadow-[8px_8px_0_#0f172a] md:p-8">
        <Link href="/" className="font-black text-pink-600">Play Toon Tone</Link>
        <p className="mt-6 text-sm font-black uppercase tracking-[0.24em] text-pink-600">Toon Tone FAQ</p>
        <h1 className="mt-3 text-4xl font-black md:text-5xl">Toon Tone FAQ</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
          Quick answers about the Toon Tone game, Toon Tone Anime, scoring, sharing, mobile play, and how the text-reference-only challenge works.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {faqItems.map(([question, answer]) => (
            <section key={question} className="rounded-2xl border-2 border-slate-200 p-5">
              <h2 className="text-xl font-black">{question}</h2>
              <p className="mt-3 leading-7 text-slate-700">{answer}</p>
            </section>
          ))}
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
