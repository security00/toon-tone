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

      <div className="relative flex aspect-square min-h-[360px] w-full items-center justify-center overflow-hidden bg-slate-50 p-6">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8fafc_0%,#eef2ff_48%,#fff1f2_100%)]" />
        <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(45deg,#cbd5e1_25%,transparent_25%),linear-gradient(-45deg,#cbd5e1_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#cbd5e1_75%),linear-gradient(-45deg,transparent_75%,#cbd5e1_75%)] [background-position:0_0,0_12px,12px_-12px,-12px_0px] [background-size:24px_24px]" />

        <div className="relative grid h-full w-full place-items-center rounded-[1.7rem] bg-white/72 p-5 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.35)] backdrop-blur-md">
          <div
            className="grid h-[min(78vw,280px)] w-[min(78vw,280px)] place-items-center rounded-[2rem] shadow-[0_24px_60px_rgba(15,23,42,0.18)] ring-8 ring-white/80 transition-colors duration-200"
            style={{ backgroundColor: displayHex }}
          >
            {!showTarget && (
              <div className="grid h-32 w-32 place-items-center rounded-full bg-white/32 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.38)] backdrop-blur-md">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-700/80">hidden</p>
                  <p className="mt-1 text-sm font-black text-slate-800/80">match from memory</p>
                </div>
              </div>
            )}
          </div>

          <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-2">
            <SwatchStripe color={displayHex} label={showTarget ? question.targetColorHex : "Your current color"} />
            {showTarget && <SwatchStripe color={question.targetColorHex} label={`H${targetHsb.h} S${targetHsb.s} B${targetHsb.b}`} />}
          </div>
        </div>
      </div>
    </div>
  );
}
