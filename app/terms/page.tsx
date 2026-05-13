import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Terms of Use | Toon-Tone",
  description: "Read the Toon-Tone Terms of Use for the unofficial cartoon color memory game.",
  alternates: { canonical: "/terms/" },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#fff7ed] px-6 py-10 text-slate-950">
      <article className="mx-auto max-w-3xl rounded-[2rem] border-4 border-slate-950 bg-white p-6 shadow-[8px_8px_0_#0f172a]">
        <Link href="/" className="font-black text-pink-600">← Play Toon-Tone</Link>
        <h1 className="mt-4 text-4xl font-black">Terms of Use</h1>
        <p className="mt-2 text-sm font-bold text-slate-500">Last updated: May 13, 2026</p>
        <h2 className="mt-8 text-2xl font-black">Use of Toon-Tone</h2>
        <p className="mt-3 leading-8 text-slate-700">
          Toon-Tone is provided as a free browser game for personal entertainment. You may play, share your own results, and link to the site as long as you do not disrupt the service or misuse future community features.
        </p>
        <h2 className="mt-8 text-2xl font-black">Unofficial references</h2>
        <p className="mt-3 leading-8 text-slate-700">
          Toon-Tone is an unofficial fan-oriented color memory game. Character and series names are used as text references only. Toon-Tone is not affiliated with, endorsed by, or sponsored by any referenced rights holder.
        </p>
        <h2 className="mt-8 text-2xl font-black">Acceptable behavior</h2>
        <p className="mt-3 leading-8 text-slate-700">
          Do not use the site to harass others, submit offensive nicknames if public score features are enabled, exploit automated abuse, or interfere with normal gameplay for other users.
        </p>
        <h2 className="mt-8 text-2xl font-black">No warranties</h2>
        <p className="mt-3 leading-8 text-slate-700">
          Toon-Tone is offered as-is. We try to keep the game available and accurate, but we do not guarantee uninterrupted access, perfect scores, or permanent availability of any feature.
        </p>
        <h2 className="mt-8 text-2xl font-black">Contact</h2>
        <p className="mt-3 leading-8 text-slate-700">
          For questions about these terms, contact <a className="font-black text-pink-600" href="mailto:support@toon-tone.net">support@toon-tone.net</a>.
        </p>
      </article>
      <SiteFooter />
    </main>
  );
}
