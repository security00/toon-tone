const paletteCards = [
  { name: "Bubble pop", colors: ["#ff4f9a", "#ffd166", "#06d6a0", "#118ab2"] },
  { name: "Retro cel", colors: ["#2b2d42", "#ef233c", "#f8f7f9", "#8d99ae"] },
  { name: "Soft mascot", colors: ["#f9c6d3", "#ffe8a3", "#b8f2e6", "#7bdff2"] },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#fde68a,transparent_34%),linear-gradient(135deg,#fff7ed_0%,#fef3c7_45%,#fce7f3_100%)] px-6 py-8 text-slate-950 sm:px-10">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-between rounded-[2rem] border-4 border-slate-950 bg-white/70 p-6 shadow-[12px_12px_0_#0f172a] backdrop-blur md:p-10">
        <nav className="flex items-center justify-between gap-4">
          <div className="text-2xl font-black tracking-tight">Toon-Tone</div>
          <a
            href="mailto:hello@toon-tone.net"
            className="rounded-full border-2 border-slate-950 bg-white px-4 py-2 text-sm font-bold shadow-[4px_4px_0_#0f172a] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#0f172a]"
          >
            Contact
          </a>
        </nav>

        <div className="grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex rounded-full border-2 border-slate-950 bg-[#06d6a0] px-4 py-2 text-sm font-black uppercase tracking-[0.24em] shadow-[4px_4px_0_#0f172a]">
              Cartoon color, sharper taste
            </p>
            <h1 className="mt-8 max-w-3xl text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
              Build a punchy toon palette in seconds.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-700 sm:text-xl">
              Toon-Tone is a lightweight starting point for cartoon palettes, character moods, and stylized visual direction. Pick a vibe, match contrast, and keep your artwork readable.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="rounded-full border-2 border-slate-950 bg-[#ff4f9a] px-6 py-3 text-center font-black text-white shadow-[5px_5px_0_#0f172a] transition hover:-translate-y-0.5" href="#palettes">
                Explore palettes
              </a>
              <a className="rounded-full border-2 border-slate-950 bg-white px-6 py-3 text-center font-black shadow-[5px_5px_0_#0f172a] transition hover:-translate-y-0.5" href="#workflow">
                See workflow
              </a>
            </div>
          </div>

          <div id="palettes" className="space-y-5">
            {paletteCards.map((card) => (
              <article key={card.name} className="rounded-3xl border-4 border-slate-950 bg-white p-5 shadow-[8px_8px_0_#0f172a]">
                <h2 className="text-xl font-black">{card.name}</h2>
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {card.colors.map((color) => (
                    <div key={color} className="h-20 rounded-2xl border-2 border-slate-950" style={{ backgroundColor: color }}>
                      <span className="sr-only">{color}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div id="workflow" className="grid gap-4 border-t-4 border-slate-950 pt-6 md:grid-cols-3">
          {[
            ["01", "Choose the mood", "Start with comic, mascot, retro cel, or soft pastel energy."],
            ["02", "Check contrast", "Keep characters readable on mobile, thumbnails, and game pages."],
            ["03", "Ship the style", "Use the palette as a repeatable guide for assets and landing pages."],
          ].map(([step, title, body]) => (
            <div key={step} className="rounded-2xl border-2 border-slate-950 bg-white p-5">
              <div className="text-sm font-black text-pink-600">{step}</div>
              <h3 className="mt-2 text-xl font-black">{title}</h3>
              <p className="mt-2 leading-7 text-slate-700">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
