import Link from "next/link";
import ToonToneGame from "@/components/ToonToneGame";
import SiteFooter from "@/components/SiteFooter";
import { QUESTIONS } from "@/lib/questions";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-5 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-4 flex items-center justify-between gap-3">
          <Link href="/" className="text-2xl font-black tracking-tight">Toon-Tone</Link>
          <div className="hidden items-center gap-3 text-sm font-bold sm:flex">
            <Link href="/toon-tone-game/">How to play</Link>
            <Link href="/leaderboard/">Leaderboard</Link>
            <Link href="/about/">About Us</Link>
            <Link href="/privacy/">Privacy</Link>
            <Link href="/terms/">Terms</Link>
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
                ["Saturation", "How pure or punchy the cartoon tone feels."],
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
          <h2 className="text-2xl font-black">FAQ</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[
              ["Is Toon-Tone free?", "Yes. Toon-Tone is free, and the Daily Challenge does not require login."],
              ["Do you use official cartoon images?", "No. Questions use text references and abstract color UI only."],
              ["Why HSB sliders?", "Hue, Saturation, and Brightness match how people remember color families, intensity, and lightness."],
              ["Can I share my score?", "Yes. Finish the 5-round daily challenge and use Share or Download PNG."],
            ].map(([q, a]) => (
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
