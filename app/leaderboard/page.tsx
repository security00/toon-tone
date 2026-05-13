import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Leaderboard | Toon Tone",
  description: "View Toon Tone leaderboard plans and local score history for the daily cartoon color guessing game.",
  alternates: { canonical: "/leaderboard/" },
  openGraph: {
    title: "Leaderboard | Toon Tone",
    description: "View Toon Tone leaderboard plans and local score history for the daily cartoon color guessing game.",
    url: "https://toon-tone.net/leaderboard/",
    siteName: "Toon Tone",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Leaderboard | Toon Tone",
    description: "View Toon Tone leaderboard plans and local score history for the daily cartoon color guessing game.",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#fff7ed] px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-3xl rounded-[2rem] border-4 border-slate-950 bg-white p-6 shadow-[8px_8px_0_#0f172a]">
        <Link href="/" className="font-black text-pink-600">← Play Toon-Tone</Link>
        <h1 className="mt-4 text-4xl font-black">Leaderboard</h1>
        <p className="mt-4 leading-8 text-slate-700">The public leaderboard is planned for the next phase. For the MVP, Toon-Tone stores recent scores locally and focuses on share cards so you can challenge friends without creating an account.</p>
      </div>
      <SiteFooter />
    </main>
  );
}
