import Link from "next/link";

const footerLinks = [
  { href: "/about/", label: "About Us" },
  { href: "/privacy/", label: "Privacy Policy" },
  { href: "/terms/", label: "Terms of Use" },
  { href: "/sitemap.xml", label: "Sitemap" },
  { href: "/robots.txt", label: "Robots" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white/80 px-4 py-8 text-slate-700 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="text-xl font-black text-slate-950">Toon Tone</Link>
          <p className="mt-2 max-w-2xl text-sm leading-6">
            Toon Tone is a free cartoon color memory game. For questions, feedback, or policy requests, contact{" "}
            <a className="font-bold text-pink-600" href="mailto:support@toon-tone.net">support@toon-tone.net</a>.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </nav>
      </div>
      <p className="mx-auto mt-5 max-w-7xl text-xs text-slate-500">
        © {new Date().getFullYear()} Toon Tone. Unofficial text-reference-only color guessing game.
      </p>
    </footer>
  );
}
