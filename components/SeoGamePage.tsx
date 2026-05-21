import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "./JsonLd";
import SiteFooter from "./SiteFooter";
import ToonToneGame from "./ToonToneGame";
import { openGraphImage, SITE_URL, twitterImage } from "@/lib/seo";

type SeoSection = {
  title: string;
  body: string;
};

type SeoGamePageProps = {
  title: string;
  intro: string;
  canonical: string;
  sections: SeoSection[];
  tips: string[];
  faq: [string, string][];
};

const relatedLinks = [
  ["Toon Tone Game", "/toon-tone-game"],
  ["Cartoon Color Guessing Game", "/cartoon-color-guessing-game"],
  ["Guess Cartoon Character Color", "/guess-cartoon-character-color"],
  ["Character Color Game", "/character-color-game"],
  ["Toon Tone Anime", "/anime-color-guessing-game"],
];

export function seoGameMetadata(title: string, description: string, canonical: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${canonical}`,
      siteName: "Toon Tone",
      images: [openGraphImage],
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [twitterImage],
    },
  };
}

export default function SeoGamePage({ title, intro, canonical, sections, tips, faq }: SeoGamePageProps) {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url: `${SITE_URL}${canonical}`,
    description: intro,
    isPartOf: { "@type": "WebSite", name: "Toon Tone", url: `${SITE_URL}/` },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#fff7ed,#fef3c7,#fce7f3)] px-3 py-4 text-slate-950 sm:px-6 sm:py-5 lg:px-8">
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={faqJsonLd} />
      <div className="mx-auto max-w-7xl">
        <nav className="mb-4 flex items-center justify-between gap-3">
          <Link href="/" className="text-2xl font-black">Toon-Tone</Link>
          <Link href="/" className="rounded-full border-2 border-slate-950 bg-white px-3 py-2 text-sm font-black shadow-[3px_3px_0_#0f172a] sm:px-4 sm:shadow-[4px_4px_0_#0f172a]">Play Daily</Link>
        </nav>
        <ToonToneGame />
        <article className="mt-8 rounded-2xl border-2 border-slate-950 bg-white p-4 shadow-[4px_4px_0_#0f172a] sm:mt-10 sm:rounded-[2rem] sm:border-4 sm:p-6 sm:shadow-[8px_8px_0_#0f172a] md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-pink-600 sm:text-sm sm:tracking-[0.24em]">Toon Tone topic page</p>
          <h1 className="mt-2 text-3xl font-black leading-tight md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">{intro}</p>

          <h2 className="mt-8 text-2xl font-black">How to play</h2>
          <ol className="mt-4 grid gap-3 md:grid-cols-3">
            <li className="rounded-2xl bg-amber-100 p-4 font-bold">1. Read the character and target part.</li>
            <li className="rounded-2xl bg-pink-100 p-4 font-bold">2. Adjust Hue, Saturation, and Brightness from memory.</li>
            <li className="rounded-2xl bg-emerald-100 p-4 font-bold">3. Lock your guess and compare your score.</li>
          </ol>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {sections.map((section) => (
              <section key={section.title} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 sm:rounded-3xl sm:p-5">
                <h2 className="text-xl font-black sm:text-2xl">{section.title}</h2>
                <p className="mt-3 leading-8 text-slate-700">{section.body}</p>
              </section>
            ))}
          </div>

          <section className="mt-8 rounded-2xl bg-slate-950 p-4 text-white sm:rounded-3xl sm:p-6">
            <h2 className="text-2xl font-black">Practical tips</h2>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {tips.map((tip) => (
                <li key={tip} className="rounded-xl bg-white/10 p-4 leading-7 sm:rounded-2xl">• {tip}</li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-black">FAQ</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {faq.map(([question, answer]) => (
                <div key={question} className="rounded-2xl border-2 border-slate-200 p-4">
                  <h3 className="font-black">{question}</h3>
                  <p className="mt-2 leading-7 text-slate-700">{answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-black">Explore related Toon Tone pages</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {relatedLinks.map(([label, href]) => (
                <Link key={href} href={href} className="rounded-full border-2 border-slate-950 px-4 py-2 text-sm font-black hover:bg-slate-950 hover:text-white">
                  {label}
                </Link>
              ))}
            </div>
          </section>
        </article>
      </div>
      <SiteFooter />
    </main>
  );
}
