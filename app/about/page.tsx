import Link from "next/link";
export default function Page() {
  return (
    <main className="min-h-screen bg-[#fff7ed] px-6 py-10 text-slate-950">
      <article className="mx-auto max-w-3xl rounded-[2rem] border-4 border-slate-950 bg-white p-6 shadow-[8px_8px_0_#0f172a]">
        <Link href="/" className="font-black text-pink-600">← Play Toon-Tone</Link>
        <h1 className="mt-4 text-4xl font-black">About Toon-Tone</h1>
        <p className="mt-4 leading-8 text-slate-700">Toon-Tone is a free, unofficial cartoon color memory game. Each round uses text references to familiar characters and asks players to recreate a target color using Hue, Saturation, and Brightness sliders.</p>
        <p className="mt-4 leading-8 text-slate-700">No official character images, screenshots, logos, music, or video are used in the MVP. All character and series names are used as text references for a memory challenge.</p>
      </article>
    </main>
  );
}
