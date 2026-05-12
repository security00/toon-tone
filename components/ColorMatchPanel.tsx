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
    <div className="relative h-full min-h-[392px] overflow-hidden rounded-[2rem] shadow-[0_22px_60px_rgba(79,70,229,0.16)]" style={{ backgroundColor: playerHex }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.22),transparent_32%)]" />

      <div className="absolute left-5 top-5 z-10 rounded-full bg-white/22 px-3 py-1 text-sm font-black text-white shadow-sm backdrop-blur-md">
        {progress}
      </div>

      <div className="absolute bottom-6 left-6 top-16 z-10 flex w-[104px] items-center justify-center rounded-[1.7rem] bg-white/18 px-3 py-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.24)] backdrop-blur-md">
        <div className="flex h-full items-center justify-center gap-3">
          <VerticalSlider label="H" value={hsb.h} min={0} max={360} disabled={locked || !started} onChange={(value) => onChange("h", value)} gradient="linear-gradient(180deg,#ff3b30 0%,#ffcc00 17%,#34c759 34%,#00c7be 50%,#007aff 67%,#af52de 84%,#ff2d55 100%)" />
          <VerticalSlider label="S" value={hsb.s} min={0} max={100} disabled={locked || !started} onChange={(value) => onChange("s", value)} gradient={`linear-gradient(180deg,${playerHex} 0%,rgba(255,255,255,0.92) 100%)`} />
          <VerticalSlider label="B" value={hsb.b} min={0} max={100} disabled={locked || !started} onChange={(value) => onChange("b", value)} gradient={`linear-gradient(180deg,#ffffff 0%,${playerHex} 45%,#050816 100%)`} />
        </div>
      </div>

      <div className="absolute bottom-5 right-5 z-10 flex items-center gap-3">
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

      <div className="absolute bottom-5 left-[142px] z-10 rounded-full bg-black/16 px-3 py-1 font-mono text-xs font-black uppercase tracking-wide text-white shadow-sm backdrop-blur-md">
        {playerHex}
      </div>
    </div>
  );
}

function VerticalSlider({ label, value, min, max, disabled, gradient, onChange }: { label: string; value: number; min: number; max: number; disabled: boolean; gradient: string; onChange: (value: number) => void }) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <label className="relative h-[258px] w-4">
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-white/85">{label}</span>
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
