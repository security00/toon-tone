import Link from "next/link";
export default function Page() {
  return (
    <main className="min-h-screen bg-[#fff7ed] px-6 py-10 text-slate-950">
      <article className="mx-auto max-w-3xl rounded-[2rem] border-4 border-slate-950 bg-white p-6 shadow-[8px_8px_0_#0f172a]">
        <Link href="/" className="font-black text-pink-600">← Play Toon-Tone</Link>
        <h1 className="mt-4 text-4xl font-black">Terms of Use</h1>
        <p className="mt-4 leading-8 text-slate-700">Toon-Tone is an unofficial fan-oriented color memory game. Character and series names are used as text references only. Toon-Tone is not affiliated with, endorsed by, or sponsored by any referenced rights holder.</p>
        <p className="mt-4 leading-8 text-slate-700">Do not use the site to harass others, abuse future leaderboard features, or submit offensive nicknames if public score features are enabled.</p>
      </article>
    </main>
  );
}
