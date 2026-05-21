import type { Hsb } from "@/lib/color";

type Props = {
  hsb: Hsb;
  playerHex: string;
  started: boolean;
  locked: boolean;
  memorizing: boolean;
  usedHint: boolean;
  progress: string;
  onChange: (key: keyof Hsb, value: number) => void;
  onStart: () => void;
  onSubmit: () => void;
  onHint: () => void;
};

export default function ColorMatchPanel({ hsb, playerHex, started, locked, memorizing, usedHint, progress, onChange, onStart, onSubmit, onHint }: Props) {
  return (
    <div className="relative h-full min-h-[340px] min-w-0 max-w-full overflow-hidden rounded-2xl shadow-sm sm:min-h-[392px] sm:rounded-[2rem] sm:shadow-[0_22px_60px_rgba(79,70,229,0.16)]" style={{ backgroundColor: playerHex }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.22),transparent_32%)]" />

      <div className="absolute left-4 top-4 z-10 rounded-full bg-white/22 px-3 py-1 text-sm font-black text-white shadow-sm backdrop-blur-md sm:left-5 sm:top-5">
        {progress}
      </div>

      <div className="absolute bottom-6 left-6 top-16 z-10 hidden w-[104px] items-center justify-center rounded-[1.7rem] bg-white/18 px-3 py-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.24)] backdrop-blur-md sm:flex">
        <div className="flex h-full items-center justify-center gap-3">
          <VerticalSlider label="H" value={hsb.h} min={0} max={360} disabled={locked || !started} onChange={(value) => onChange("h", value)} gradient="linear-gradient(180deg,#ff3b30 0%,#ffcc00 17%,#34c759 34%,#00c7be 50%,#007aff 67%,#af52de 84%,#ff2d55 100%)" />
          <VerticalSlider label="S" value={hsb.s} min={0} max={100} disabled={locked || !started} onChange={(value) => onChange("s", value)} gradient={`linear-gradient(180deg,${playerHex} 0%,rgba(255,255,255,0.92) 100%)`} />
          <VerticalSlider label="B" value={hsb.b} min={0} max={100} disabled={locked || !started} onChange={(value) => onChange("b", value)} gradient={`linear-gradient(180deg,#ffffff 0%,${playerHex} 45%,#050816 100%)`} />
        </div>
      </div>

      <div className="absolute bottom-5 right-5 z-10 hidden items-center gap-3 sm:flex">
        <button
          type="button"
          disabled={!started || locked || usedHint}
          onClick={onHint}
          aria-label="Hint"
          className="grid h-12 w-12 place-items-center rounded-full bg-[#e5f2ea] text-xl font-black text-slate-800 shadow-[0_10px_24px_rgba(15,23,42,0.18)] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ?
        </button>
        {!started ? (
          <button
            type="button"
            onClick={onStart}
            className="grid h-12 min-w-24 place-items-center rounded-full bg-white px-5 text-base font-black text-slate-900 shadow-[0_10px_24px_rgba(15,23,42,0.22)] transition hover:scale-105"
          >
            Start
          </button>
        ) : (
          <button
            type="button"
            disabled={locked || memorizing}
            onClick={onSubmit}
            aria-label="Submit guess"
            className="grid h-12 w-12 place-items-center rounded-full bg-white text-2xl font-black text-slate-900 shadow-[0_10px_24px_rgba(15,23,42,0.22)] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ✓
          </button>
        )}
      </div>

      <div className="absolute bottom-5 left-[142px] z-10 hidden space-y-2 sm:block">
        <div className="rounded-full bg-black/16 px-3 py-1 font-mono text-xs font-black uppercase tracking-wide text-white shadow-sm backdrop-blur-md">
          {playerHex}
        </div>
        <div className="rounded-2xl bg-black/18 px-3 py-2 font-mono text-[11px] font-black uppercase tracking-wide text-white shadow-sm backdrop-blur-md">
          H {hsb.h} · S {hsb.s} · B {hsb.b}
        </div>
      </div>

      <div className="relative z-10 flex min-h-[340px] min-w-0 flex-col justify-end p-3 sm:hidden">
        <div className="mb-3 ml-auto rounded-full bg-white/70 px-3 py-2 text-xs font-black text-slate-800 shadow-sm backdrop-blur">
          {playerHex}
        </div>
        <div className="w-full min-w-0 rounded-2xl bg-white/86 p-3 shadow-[0_14px_34px_rgba(15,23,42,0.18)] backdrop-blur-md">
          <div className="mb-3 grid gap-3">
            <div className="min-w-0 break-words font-mono text-[11px] font-black uppercase text-slate-700">
              H {hsb.h} · S {hsb.s} · B {hsb.b}
            </div>
            <div className="grid grid-cols-[44px_1fr] items-center gap-2">
              <button
                type="button"
                disabled={!started || locked || usedHint}
                onClick={onHint}
                aria-label="Hint"
                className="grid h-10 w-10 place-items-center rounded-full bg-[#e5f2ea] text-lg font-black text-slate-800 shadow-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                ?
              </button>
              {!started ? (
                <button
                  type="button"
                  onClick={onStart}
                  className="h-10 w-full rounded-full bg-slate-950 px-4 text-sm font-black text-white shadow-sm"
                >
                  Start
                </button>
              ) : (
                <button
                  type="button"
                  disabled={locked || memorizing}
                  onClick={onSubmit}
                  aria-label="Submit guess"
                  className="grid h-10 w-full place-items-center rounded-full bg-slate-950 text-xl font-black text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ✓
                </button>
              )}
            </div>
          </div>
          <div className="space-y-3">
            <MobileSlider label="Hue" value={hsb.h} min={0} max={360} disabled={locked || !started} onChange={(value) => onChange("h", value)} gradient="linear-gradient(90deg,#ff3b30 0%,#ffcc00 17%,#34c759 34%,#00c7be 50%,#007aff 67%,#af52de 84%,#ff2d55 100%)" />
            <MobileSlider label="Sat" value={hsb.s} min={0} max={100} disabled={locked || !started} onChange={(value) => onChange("s", value)} gradient={`linear-gradient(90deg,rgba(255,255,255,0.92) 0%,${playerHex} 100%)`} />
            <MobileSlider label="Bright" value={hsb.b} min={0} max={100} disabled={locked || !started} onChange={(value) => onChange("b", value)} gradient={`linear-gradient(90deg,#050816 0%,${playerHex} 55%,#ffffff 100%)`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function VerticalSlider({ label, value, min, max, disabled, gradient, onChange }: { label: string; value: number; min: number; max: number; disabled: boolean; gradient: string; onChange: (value: number) => void }) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <label className="relative h-[218px] w-6 sm:h-[258px] sm:w-4">
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-white/85">{label}</span>
      <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded-full bg-black/18 px-1.5 py-0.5 font-mono text-[10px] font-black text-white shadow-sm backdrop-blur-md">{value}</span>
      <span className="absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.38),0_10px_20px_rgba(15,23,42,0.12)]" style={{ background: gradient }} />
      <input
        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        style={{ writingMode: "vertical-lr", direction: "rtl" }}
        type="range"
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <span className="pointer-events-none absolute left-1/2 z-20 h-4.5 w-4.5 rounded-full border-[3px] border-white bg-white shadow-[0_4px_12px_rgba(15,23,42,0.28)]" style={{ top: `${100 - percent}%`, transform: "translate(-50%, -50%)" }} />
    </label>
  );
}

function MobileSlider({ label, value, min, max, disabled, gradient, onChange }: { label: string; value: number; min: number; max: number; disabled: boolean; gradient: string; onChange: (value: number) => void }) {
  return (
    <label className="grid gap-1.5">
      <span className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.12em] text-slate-700">
        <span>{label}</span>
        <span className="font-mono">{value}</span>
      </span>
      <span className="relative h-8 min-w-0 overflow-hidden rounded-full shadow-[inset_0_0_0_1px_rgba(15,23,42,0.16)]" style={{ background: gradient }}>
        <input
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          type="range"
          min={min}
          max={max}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(Number(event.target.value))}
        />
      </span>
    </label>
  );
}
