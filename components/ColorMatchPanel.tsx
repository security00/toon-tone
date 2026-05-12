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
    <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_22px_60px_rgba(79,70,229,0.18)]" style={{ backgroundColor: playerHex }}>
      <div className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1 text-sm font-bold text-white backdrop-blur">
        {progress}
      </div>

      <div className="absolute inset-y-7 left-5 flex gap-3">
        <VerticalSlider label="H" value={hsb.h} min={0} max={360} disabled={locked || !started} onChange={(value) => onChange("h", value)} gradient="linear-gradient(180deg,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)" />
        <VerticalSlider label="S" value={hsb.s} min={0} max={100} disabled={locked || !started} onChange={(value) => onChange("s", value)} gradient={`linear-gradient(180deg,${playerHex},#e5e7eb)`} />
        <VerticalSlider label="B" value={hsb.b} min={0} max={100} disabled={locked || !started} onChange={(value) => onChange("b", value)} gradient={`linear-gradient(180deg,${playerHex},#020617)`} />
      </div>

      <div className="absolute bottom-5 right-5 flex gap-3">
        <button
          type="button"
          disabled={!started || locked || usedHint}
          onClick={onHint}
          aria-label="Hint"
          className="grid h-14 w-14 place-items-center rounded-full bg-[#dcefe4] text-2xl font-black text-slate-800 shadow-[0_10px_24px_rgba(15,23,42,0.18)] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ?
        </button>
        {!started ? (
          <button
            type="button"
            onClick={onStart}
            className="grid h-14 min-w-24 place-items-center rounded-full bg-white px-5 text-base font-black text-slate-900 shadow-[0_10px_24px_rgba(15,23,42,0.22)] transition hover:scale-105"
          >
            Start
          </button>
        ) : (
          <button
            type="button"
            disabled={locked || memorizing}
            onClick={onSubmit}
            aria-label="Submit guess"
            className="grid h-14 w-14 place-items-center rounded-full bg-white text-3xl font-black text-slate-900 shadow-[0_10px_24px_rgba(15,23,42,0.22)] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ✓
          </button>
        )}
      </div>

      <div className="absolute bottom-5 left-5 rounded-full bg-black/18 px-3 py-1 font-mono text-xs font-bold text-white backdrop-blur">
        {playerHex}
      </div>
    </div>
  );
}

function VerticalSlider({ label, value, min, max, disabled, gradient, onChange }: { label: string; value: number; min: number; max: number; disabled: boolean; gradient: string; onChange: (value: number) => void }) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <label className="relative flex h-full w-7 items-center justify-center rounded-full bg-white/25 p-1 shadow-inner backdrop-blur">
      <span className="sr-only">{label}</span>
      <input
        className="h-[260px] w-7 cursor-pointer appearance-none rounded-full disabled:cursor-not-allowed disabled:opacity-50"
        style={{ background: gradient, writingMode: "vertical-lr", direction: "rtl" }}
        type="range"
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <span className="pointer-events-none absolute left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-white bg-white shadow" style={{ top: `${100 - percent}%`, transform: "translate(-50%, -50%)" }} />
    </label>
  );
}
