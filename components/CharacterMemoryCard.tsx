import type { Question } from "@/lib/questions";
import { hexToHsb } from "@/lib/color";

type Props = {
  question: Question;
  reveal: boolean;
  playerHex: string;
  locked: boolean;
};

function SwatchStripe({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-xs font-black text-slate-700 shadow-sm ring-1 ring-slate-200 backdrop-blur">
      <span className="h-4 w-4 rounded-full ring-1 ring-slate-300" style={{ backgroundColor: color }} />
      <span>{label}</span>
    </div>
  );
}

export default function CharacterMemoryCard({ question, reveal, playerHex, locked }: Props) {
  const showTarget = reveal || locked;
  const displayHex = showTarget ? question.targetColorHex : playerHex;
  const targetHsb = hexToHsb(question.targetColorHex);

  return (
    <div className="h-full overflow-hidden rounded-[2rem] bg-white shadow-[0_22px_60px_rgba(79,70,229,0.14)] ring-1 ring-slate-200">
      <div className="flex items-center justify-between px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
        <span>{showTarget ? "Target color" : "Hidden target"}</span>
        <span>{question.targetPart}</span>
      </div>

      <div className="relative aspect-square min-h-[360px] w-full overflow-hidden transition-colors duration-200" style={{ backgroundColor: displayHex }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(255,255,255,0.34),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.22),rgba(15,23,42,0.12))]" />

        <div className="relative flex h-full w-full flex-col justify-between p-6">
          <div className="flex justify-end">
            <SwatchStripe color={displayHex} label={showTarget ? question.targetColorHex : "Your current color"} />
          </div>

          {!showTarget && (
            <div className="grid self-center rounded-3xl bg-white/30 px-8 py-6 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.38),0_18px_44px_rgba(15,23,42,0.18)] backdrop-blur-md">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-800/80">hidden</p>
              <p className="mt-2 text-lg font-black text-slate-900/80">match from memory</p>
            </div>
          )}

          <div className="flex min-h-10 flex-wrap items-end justify-between gap-2">
            <div className="rounded-2xl bg-white/24 px-4 py-3 text-sm font-black text-slate-900/80 shadow-sm backdrop-blur-md">
              {question.characterName} · {question.targetPart}
            </div>
            {showTarget && <SwatchStripe color={question.targetColorHex} label={`H${targetHsb.h} S${targetHsb.s} B${targetHsb.b}`} />}
          </div>
        </div>
      </div>
    </div>
  );
}
