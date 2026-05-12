import Link from "next/link";
export default function Page() {
  return (
    <main className="min-h-screen bg-[#fff7ed] px-6 py-10 text-slate-950">
      <article className="mx-auto max-w-3xl rounded-[2rem] border-4 border-slate-950 bg-white p-6 shadow-[8px_8px_0_#0f172a]">
        <Link href="/" className="font-black text-pink-600">← Play Toon-Tone</Link>
        <h1 className="mt-4 text-4xl font-black">Privacy Policy</h1>
        <p className="mt-4 leading-8 text-slate-700">Toon-Tone does not require an account for the Daily Challenge. The MVP stores recent scores and streak-style information in your browser localStorage only.</p>
        <p className="mt-4 leading-8 text-slate-700">We do not ask for your email, precise location, or real identity to play. Future analytics or leaderboard features will be added only with clear notices and basic abuse protection.</p>
      </article>
    </main>
  );
}
