import Link from "next/link";
import ToonToneGame from "@/components/ToonToneGame";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import { QUESTIONS } from "@/lib/questions";

const faqItems = [
  ["Is Toon-Tone free?", "Yes. Toon-Tone is free, and the Daily Challenge does not require login, downloads, or payment."],
  ["What is Toon Tone?", "Toon Tone is a browser color memory game where you rebuild cartoon, anime, superhero, movie, and game character colors with Hue, Saturation, and Brightness sliders."],
  ["Do you use official cartoon images?", "No. Questions use text references and abstract color UI only. The MVP does not use official character images, screenshots, logos, audio, or video."],
  ["Why HSB sliders?", "Hue, Saturation, and Brightness match how people remember color families, intensity, and lightness, so the controls feel easier than typing hex codes."],
  ["How does Toon Tone scoring work?", "Each round compares your selected color with the hidden target color and maps the visual distance to a 0–10 score."],
  ["Can I share my score?", "Yes. Finish the 5-round daily challenge and use Share or Download PNG to send your result to friends."],
  ["Can Toon Tone improve color memory?", "It can help you practice noticing hue, saturation, and brightness separately. It is a casual game, not a medical or vision test."],
  ["Does Toon Tone work on mobile?", "Yes. The game runs in a modern browser and the sliders are designed for desktop and mobile play."],
];

const webApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Toon Tone",
  url: "https://toon-tone.net/",
  applicationCategory: "GameApplication",
  operatingSystem: "Any modern browser",
  description:
    "Toon Tone is a free browser cartoon color guessing game where players match character-inspired colors from memory with HSB sliders.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-5 text-slate-950 sm:px-6 lg:px-8">
      <JsonLd data={webApplicationJsonLd} />
      <JsonLd data={faqJsonLd} />
      <div className="mx-auto max-w-7xl">
        <nav className="mb-4 flex items-center justify-between gap-3">
          <Link href="/" className="text-2xl font-black tracking-tight">Toon-Tone</Link>
          <div className="hidden items-center gap-3 text-sm font-bold sm:flex">
            <Link href="/toon-tone-game">How to play</Link>
            <Link href="/how-to-play">Guide</Link>
            <Link href="/leaderboard">Leaderboard</Link>
            <Link href="/about">About Us</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </nav>

        <ToonToneGame />

        <section className="mt-10 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-pink-600">Cartoon color guessing game</p>
            <h2 className="mt-3 text-3xl font-black">Guess cartoon character colors with HSB sliders.</h2>
            <p className="mt-4 leading-8 text-slate-700">
              Toon Tone is a free browser game where every round asks what color a famous cartoon, anime, superhero, movie, or game character&apos;s target part should be. Adjust Hue, Saturation, and Brightness, lock your guess, then compare your memory with the answer.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["Hue", "The color family your brain remembers first."],
                ["Saturation", "How pure, muted, pastel, or punchy the cartoon tone feels."],
                ["Brightness", "How light, dark, or screen-lit the memory is."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-2xl border-2 border-slate-200 p-4">
                  <h3 className="font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                </div>
              ))}
            </div>
          </article>
          <aside className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
            <h2 className="text-2xl font-black">MVP question bank</h2>
            <p className="mt-3 leading-7 text-slate-300">The game uses {QUESTIONS.length} text-reference-only questions. No official character images, screenshots, logos, audio, or video are used.</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li>• Daily Challenge: 5 fixed rounds per day.</li>
              <li>• Scoring: perceptual color distance mapped to 0–10.</li>
              <li>• Sharing: Web Share, copy fallback, PNG score card.</li>
              <li>• Local history: recent scores stored on your device.</li>
            </ul>
          </aside>
        </section>

        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-pink-600">What is Toon Tone?</p>
          <h2 className="mt-3 text-3xl font-black">A quick color memory game for cartoon fans.</h2>
          <div className="mt-4 grid gap-5 text-slate-700 lg:grid-cols-2">
            <p className="leading-8">
              Toon Tone turns color memory into a short playable challenge. Instead of matching a random square, every prompt gives the color a context: a hair color, shirt, hat, cape, body, glove, or other recognizable character part. That makes the game feel closer to a cartoon trivia puzzle than a plain color picker.
            </p>
            <p className="leading-8">
              The site is built for direct play first. You can open the daily Toon Tone challenge, study the prompt, tune the HSB sliders, and see a score in seconds. The content below the game explains the rules for search visitors, new players, and anyone trying to improve their color matching accuracy.
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-3">
          {[
            ["1. Read the prompt", "Each round names a character, source, and target part. Focus on the named part instead of trying to remember the entire character palette."],
            ["2. Tune HSB in order", "Set hue first, then saturation, then brightness. This keeps each Toon Tone guess calm and prevents random slider chasing."],
            ["3. Reveal and learn", "After you lock the guess, compare your color with the target and use the score to spot whether you missed by hue, intensity, or value."],
          ].map(([title, body]) => (
            <article key={title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-black">{title}</h2>
              <p className="mt-3 leading-7 text-slate-700">{body}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-3xl font-black">Why HSB works for Toon Tone</h2>
          <div className="mt-4 grid gap-5 md:grid-cols-3">
            <p className="leading-7 text-slate-700"><strong>Hue</strong> answers the first memory question: is the target red, orange, yellow, green, blue, purple, or somewhere between?</p>
            <p className="leading-7 text-slate-700"><strong>Saturation</strong> handles how vivid the cartoon color feels. Many misses happen when a guess is too neon or too washed out.</p>
            <p className="leading-7 text-slate-700"><strong>Brightness</strong> controls value. A color can have the right family but still feel wrong if it is too dark, pale, or screen-lit.</p>
          </div>
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
            <h2 className="text-3xl font-black">How scoring works</h2>
            <p className="mt-4 leading-8 text-slate-300">
              Toon Tone compares your selected color with the hidden target color and converts the visual distance into a 0–10 score. A near match earns a high round score; a color that drifts in hue, saturation, or brightness loses points. The final daily result averages the five rounds.
            </p>
            <Link href="/how-toon-tone-scoring-works" className="mt-5 inline-block rounded-full bg-white px-5 py-3 font-black text-slate-950">Read the scoring guide</Link>
          </article>
          <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-3xl font-black">Tips for better scores</h2>
            <ul className="mt-4 space-y-3 leading-7 text-slate-700">
              <li>• Start with the color family before fine-tuning saturation or brightness.</li>
              <li>• For clothing and accessories, check whether the remembered color was vivid or muted.</li>
              <li>• For skin, fur, hair, and softer parts, brightness often matters as much as hue.</li>
              <li>• After each reveal, decide which slider caused the miss before moving to the next round.</li>
            </ul>
          </article>
        </section>

        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-3xl font-black">Learn more</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              ["How to play", "/how-to-play", "A simple walkthrough for the daily Toon Tone challenge."],
              ["Improve color memory", "/how-to-get-better-at-color-memory", "Practical tips for reading hue, saturation, and brightness."],
              ["Scoring guide", "/how-toon-tone-scoring-works", "Understand how each guess turns into a score."],
            ].map(([title, href, body]) => (
              <Link key={href} href={href} className="rounded-2xl border-2 border-slate-200 p-4 transition hover:-translate-y-1 hover:border-pink-400">
                <h3 className="font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-3xl font-black">FAQ</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {faqItems.map(([q, a]) => (
              <div key={q} className="rounded-2xl border-2 border-slate-200 bg-white p-4">
                <h3 className="font-black">{q}</h3>
                <p className="mt-2 leading-7 text-slate-700">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
