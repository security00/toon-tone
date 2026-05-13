import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";

type GuideSection = {
  title: string;
  body: string;
};

type GuidePageProps = {
  title: string;
  intro: string;
  sections: GuideSection[];
  faq: [string, string][];
  canonical: string;
};

export function guideMetadata(title: string, description: string, canonical: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: `https://toon-tone.net${canonical}`,
      siteName: "Toon Tone",
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default function GuidePage({ title, intro, sections, faq, canonical }: GuidePageProps) {
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    description: intro,
    url: `https://toon-tone.net${canonical}`,
    step: sections.slice(0, 5).map((section, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: section.title,
      text: section.body,
    })),
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
    <main className="min-h-screen bg-[linear-gradient(135deg,#fff7ed,#fef3c7,#fce7f3)] px-4 py-5 text-slate-950 sm:px-6 lg:px-8">
      <JsonLd data={howToJsonLd} />
      <JsonLd data={faqJsonLd} />
      <div className="mx-auto max-w-5xl">
        <nav className="mb-6 flex items-center justify-between gap-3">
          <Link href="/" className="text-2xl font-black">Toon-Tone</Link>
          <Link href="/" className="rounded-full border-2 border-slate-950 bg-white px-4 py-2 text-sm font-black shadow-[4px_4px_0_#0f172a]">Play Daily</Link>
        </nav>

        <article className="rounded-[2rem] border-4 border-slate-950 bg-white p-6 shadow-[8px_8px_0_#0f172a] md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-pink-600">Toon Tone guide</p>
          <h1 className="mt-3 text-4xl font-black md:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">{intro}</p>

          <div className="mt-8 grid gap-5">
            {sections.map((section, index) => (
              <section key={section.title} className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
                <p className="text-sm font-black text-pink-600">Step {index + 1}</p>
                <h2 className="mt-2 text-2xl font-black">{section.title}</h2>
                <p className="mt-3 leading-8 text-slate-700">{section.body}</p>
              </section>
            ))}
          </div>

          <section className="mt-8 rounded-3xl bg-slate-950 p-6 text-white">
            <h2 className="text-2xl font-black">Related Toon Tone guides</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {[
                ["How to play", "/how-to-play/"],
                ["Improve color memory", "/how-to-get-better-at-color-memory/"],
                ["Scoring guide", "/how-toon-tone-scoring-works/"],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="rounded-2xl bg-white px-4 py-3 font-black text-slate-950">{label}</Link>
              ))}
            </div>
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
        </article>
      </div>
      <SiteFooter />
    </main>
  );
}
