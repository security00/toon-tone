import type { Question } from "@/lib/questions";

type Props = {
  question: Question;
  reveal: boolean;
  playerHex: string;
  locked: boolean;
};

const neutral = "#D9DEE7";
const ink = "#0f172a";

function partColor(part: string, targetHex: string, playerHex: string, reveal: boolean, locked: boolean) {
  const normalized = part.toLowerCase();
  const active = reveal ? targetHex : locked ? targetHex : playerHex;
  if (normalized.includes("shirt") || normalized.includes("dress") || normalized.includes("jacket") || normalized.includes("gi") || normalized.includes("outfit") || normalized.includes("tunic") || normalized.includes("armor") || normalized.includes("shorts") || normalized.includes("battle suit") || normalized.includes("cape")) return active;
  return neutral;
}

function skinColor(part: string, targetHex: string, playerHex: string, reveal: boolean, locked: boolean) {
  const normalized = part.toLowerCase();
  if (normalized.includes("skin") || normalized.includes("body") || normalized.includes("fur") || normalized.includes("feathers")) return reveal ? targetHex : locked ? targetHex : playerHex;
  return "#F8D4B8";
}

function accentColor(part: string, targetHex: string, playerHex: string, reveal: boolean, locked: boolean) {
  const normalized = part.toLowerCase();
  if (normalized.includes("hat") || normalized.includes("bow") || normalized.includes("cheek") || normalized.includes("hair") || normalized.includes("helmet") || normalized.includes("tiara") || normalized.includes("bill") || normalized.includes("arrow")) return reveal ? targetHex : locked ? targetHex : playerHex;
  return "#94A3B8";
}

export default function CharacterMemoryCard({ question, reveal, playerHex, locked }: Props) {
  const part = question.targetPart.toLowerCase();
  const target = question.targetColorHex;
  const body = skinColor(part, target, playerHex, reveal, locked);
  const clothes = partColor(part, target, playerHex, reveal, locked);
  const accent = accentColor(part, target, playerHex, reveal, locked);
  const targetLabel = reveal ? "Memorize the target color" : locked ? "Answer revealed" : "Recreate the hidden color";

  return (
    <div className="rounded-[2rem] border-4 border-slate-950 bg-white p-3 shadow-[6px_6px_0_#0f172a]">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-white">{targetLabel}</span>
        <span className="rounded-full border-2 border-slate-950 px-3 py-1 text-xs font-black">{question.targetPart}</span>
      </div>
      <svg viewBox="0 0 360 360" role="img" aria-label={`Abstract memory card for ${question.characterName}`} className="aspect-square w-full rounded-3xl bg-[radial-gradient(circle_at_top,#fef3c7,#fce7f3)]">
        <rect x="24" y="24" width="312" height="312" rx="34" fill="#fff7ed" stroke={ink} strokeWidth="8" />
        <circle cx="180" cy="128" r="68" fill={body} stroke={ink} strokeWidth="8" />
        <circle cx="153" cy="117" r="12" fill="#fff" stroke={ink} strokeWidth="5" />
        <circle cx="207" cy="117" r="12" fill="#fff" stroke={ink} strokeWidth="5" />
        <circle cx="156" cy="119" r="5" fill={ink} />
        <circle cx="210" cy="119" r="5" fill={ink} />
        <path d="M152 151 Q180 173 209 151" fill="none" stroke={ink} strokeWidth="7" strokeLinecap="round" />
        <path d="M107 96 Q180 32 253 96" fill={part.includes("hair") ? accent : neutral} stroke={ink} strokeWidth="8" strokeLinejoin="round" />
        <path d="M132 204 H228 Q276 220 292 300 H68 Q84 220 132 204 Z" fill={clothes} stroke={ink} strokeWidth="8" strokeLinejoin="round" />
        <path d="M132 204 Q180 246 228 204" fill="#ffffff66" stroke={ink} strokeWidth="6" />
        <circle cx="118" cy="145" r="14" fill={part.includes("cheek") ? accent : "#f7a8b8"} stroke={ink} strokeWidth="5" />
        <circle cx="242" cy="145" r="14" fill={part.includes("cheek") ? accent : "#f7a8b8"} stroke={ink} strokeWidth="5" />
        <path d="M118 63 H242 L224 32 H136 Z" fill={part.includes("hat") || part.includes("helmet") || part.includes("tiara") ? accent : neutral} stroke={ink} strokeWidth="8" strokeLinejoin="round" />
        <path d="M112 72 H248" stroke={ink} strokeWidth="8" strokeLinecap="round" />
        <path d="M259 72 l35 20 l-35 20 l-35 -20 Z" fill={part.includes("bow") ? accent : "#ff4f9a"} stroke={ink} strokeWidth="7" strokeLinejoin="round" />
        <path d="M278 206 Q315 246 304 309" fill="none" stroke={part.includes("cape") ? accent : neutral} strokeWidth="20" strokeLinecap="round" />
        <circle cx="296" cy="306" r="18" fill={part.includes("shoes") ? accent : neutral} stroke={ink} strokeWidth="6" />
        <circle cx="72" cy="306" r="18" fill={part.includes("shoes") ? accent : neutral} stroke={ink} strokeWidth="6" />
        {!reveal && !locked && (
          <g>
            <rect x="42" y="42" width="276" height="276" rx="26" fill="#64748b" opacity="0.18" />
            <path d="M82 180 H278" stroke="#0f172a" strokeWidth="10" strokeLinecap="round" opacity="0.18" />
            <text x="180" y="330" textAnchor="middle" fill={ink} fontSize="18" fontWeight="900">target hidden</text>
          </g>
        )}
      </svg>
    </div>
  );
}
