import Link from "next/link";
import ToonToneGame from "./ToonToneGame";

export default function SeoGamePage({ title, intro }: { title: string; intro: string }) {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#fff7ed,#fef3c7,#fce7f3)] px-4 py-5 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black">Toon-Tone</Link>
          <Link href="/" className="rounded-full border-2 border-slate-950 bg-white px-4 py-2 text-sm font-black shadow-[4px_4px_0_#0f172a]">Play Daily</Link>
        </nav>
        <ToonToneGame />
        <section className="mt-10 rounded-[2rem] border-4 border-slate-950 bg-white p-6 shadow-[8px_8px_0_#0f172a]">
          <h1 className="text-4xl font-black">{title}</h1>
          <p className="mt-4 max-w-3xl leading-8 text-slate-700">{intro}</p>
          <h2 className="mt-8 text-2xl font-black">How to play</h2>
          <ol className="mt-4 grid gap-3 md:grid-cols-3">
            <li className="rounded-2xl bg-amber-100 p-4 font-bold">1. Read the character and target part.</li>
            <li className="rounded-2xl bg-pink-100 p-4 font-bold">2. Adjust Hue, Saturation, and Brightness from memory.</li>
            <li className="rounded-2xl bg-emerald-100 p-4 font-bold">3. Lock your guess and compare your score.</li>
          </ol>
        </section>
      </div>
    </main>
  );
}
