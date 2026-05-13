import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy | Toon-Tone",
  description: "Read the Toon-Tone Privacy Policy, including local browser storage, contact information, and future analytics notices.",
  alternates: { canonical: "/privacy/" },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#fff7ed] px-6 py-10 text-slate-950">
      <article className="mx-auto max-w-3xl rounded-[2rem] border-4 border-slate-950 bg-white p-6 shadow-[8px_8px_0_#0f172a]">
        <Link href="/" className="font-black text-pink-600">← Play Toon-Tone</Link>
        <h1 className="mt-4 text-4xl font-black">Privacy Policy</h1>
        <p className="mt-2 text-sm font-bold text-slate-500">Last updated: May 13, 2026</p>
        <p className="mt-4 leading-8 text-slate-700">
          Toon-Tone is designed to be playable without creating an account. This policy explains what information is used by the current MVP.
        </p>
        <h2 className="mt-8 text-2xl font-black">Information we do not require</h2>
        <p className="mt-3 leading-8 text-slate-700">
          You do not need to provide your email address, real name, precise location, or payment information to play the Daily Challenge.
        </p>
        <h2 className="mt-8 text-2xl font-black">Local browser storage</h2>
        <p className="mt-3 leading-8 text-slate-700">
          The game may store recent scores, daily completion status, and streak-style information in your browser localStorage. This data stays on your device unless you choose to share a score card or copied result.
        </p>
        <h2 className="mt-8 text-2xl font-black">Analytics and future features</h2>
        <p className="mt-3 leading-8 text-slate-700">
          If analytics, public leaderboards, or account features are added later, Toon-Tone will provide clear notices and use only the information needed to operate those features and protect against abuse.
        </p>
        <h2 className="mt-8 text-2xl font-black">Contact</h2>
        <p className="mt-3 leading-8 text-slate-700">
          For privacy questions or requests, contact <a className="font-black text-pink-600" href="mailto:support@toon-tone.net">support@toon-tone.net</a>.
        </p>
      </article>
      <SiteFooter />
    </main>
  );
}
