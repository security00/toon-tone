import type { Question } from "@/lib/questions";

type Props = {
  question: Question;
  reveal: boolean;
  playerHex: string;
  locked: boolean;
};

const hidden = "#D8DCE3";
const ink = "#111827";
const skin = "#F3C7A8";

function activeColor(targetHex: string, playerHex: string, reveal: boolean, locked: boolean) {
  if (reveal || locked) return targetHex;
  return playerHex;
}

export default function CharacterMemoryCard({ question, reveal, playerHex, locked }: Props) {
  const part = question.targetPart.toLowerCase();
  const active = activeColor(question.targetColorHex, playerHex, reveal, locked);
  const isBody = /body|skin|fur|feathers/.test(part);
  const isClothes = /shirt|dress|jacket|gi|outfit|tunic|armor|shorts|battle suit|cape/.test(part);
  const isAccent = /hat|bow|cheek|hair|helmet|tiara|bill|arrow|shoes/.test(part);
  const body = isBody ? active : skin;
  const clothes = isClothes ? active : hidden;
  const accent = isAccent ? active : hidden;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-3">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>{reveal ? "Memorize" : locked ? "Answer" : "Hidden target"}</span>
        <span>{question.targetPart}</span>
      </div>
      <svg viewBox="0 0 320 320" role="img" aria-label={`Abstract memory card for ${question.characterName}`} className="aspect-square w-full rounded-2xl bg-slate-50">
        <circle cx="160" cy="112" r="58" fill={body} stroke={ink} strokeWidth="5" />
        <path d="M99 91 Q160 39 221 91" fill={part.includes("hair") ? accent : hidden} stroke={ink} strokeWidth="5" strokeLinejoin="round" />
        <circle cx="138" cy="106" r="9" fill="#fff" stroke={ink} strokeWidth="3" />
        <circle cx="182" cy="106" r="9" fill="#fff" stroke={ink} strokeWidth="3" />
        <circle cx="140" cy="108" r="3.5" fill={ink} />
        <circle cx="184" cy="108" r="3.5" fill={ink} />
        <path d="M137 137 Q160 153 184 137" fill="none" stroke={ink} strokeWidth="5" strokeLinecap="round" />
        <circle cx="110" cy="132" r="11" fill={part.includes("cheek") ? accent : "#F7B5C8"} stroke={ink} strokeWidth="3" />
        <circle cx="210" cy="132" r="11" fill={part.includes("cheek") ? accent : "#F7B5C8"} stroke={ink} strokeWidth="3" />
        <path d="M114 184 H206 Q245 199 258 272 H62 Q75 199 114 184 Z" fill={clothes} stroke={ink} strokeWidth="5" strokeLinejoin="round" />
        <path d="M114 184 Q160 219 206 184" fill="#ffffff80" stroke={ink} strokeWidth="4" />
        <path d="M107 54 H213 L198 31 H122 Z" fill={part.includes("hat") || part.includes("helmet") || part.includes("tiara") ? accent : hidden} stroke={ink} strokeWidth="5" strokeLinejoin="round" />
        <path d="M102 62 H218" stroke={ink} strokeWidth="5" strokeLinecap="round" />
        <path d="M228 64 l28 15 l-28 15 l-28 -15 Z" fill={part.includes("bow") ? accent : "#F472B6"} stroke={ink} strokeWidth="4" strokeLinejoin="round" />
        <path d="M232 188 Q272 224 263 279" fill="none" stroke={part.includes("cape") ? accent : hidden} strokeWidth="14" strokeLinecap="round" />
        {!reveal && !locked && (
          <g>
            <rect x="36" y="36" width="248" height="248" rx="22" fill="#f8fafc" opacity="0.58" />
            <text x="160" y="296" textAnchor="middle" fill="#64748b" fontSize="15" fontWeight="700">match from memory</text>
          </g>
        )}
      </svg>
    </div>
  );
}
