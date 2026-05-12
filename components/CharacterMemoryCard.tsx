import type { Question } from "@/lib/questions";

type Props = {
  question: Question;
  reveal: boolean;
  playerHex: string;
  locked: boolean;
};

const hidden = "#CFD5DE";
const ink = "#171717";

const skinTones = ["#F3C7A8", "#E9B48F", "#C98B62", "#7A553B", "#F1D8A8"];
const baseFurs = ["#F6C453", "#F59E0B", "#94A3B8", "#7DD3FC", "#A7F3D0", "#F9A8D4"];
const bgGradients = [
  ["#FDE68A", "#FBCFE8"],
  ["#BAE6FD", "#DDD6FE"],
  ["#BBF7D0", "#FEF3C7"],
  ["#FECACA", "#E0E7FF"],
  ["#CFFAFE", "#FDE68A"],
];

function hashText(text: string) {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  return hash;
}

function activeColor(targetHex: string, playerHex: string, reveal: boolean, locked: boolean) {
  if (reveal || locked) return targetHex;
  return playerHex;
}

export default function CharacterMemoryCard({ question, reveal, playerHex, locked }: Props) {
  const part = question.targetPart.toLowerCase();
  const active = activeColor(question.targetColorHex, playerHex, reveal, locked);
  const hash = hashText(question.characterName + question.sourceTitle);
  const bg = bgGradients[hash % bgGradients.length];
  const naturalSkin = skinTones[hash % skinTones.length];
  const naturalFur = baseFurs[(hash >> 3) % baseFurs.length];
  const targetHidden = !reveal && !locked;

  const bodyTarget = /body|skin|fur|feathers/.test(part);
  const clothesTarget = /shirt|dress|jacket|gi|outfit|tunic|armor|shorts|battle suit/.test(part);
  const capeTarget = part.includes("cape");
  const hairTarget = part.includes("hair");
  const hatTarget = /hat|helmet|tiara/.test(part);
  const bowTarget = part.includes("bow");
  const cheekTarget = part.includes("cheek");
  const shoesTarget = part.includes("shoes");
  const billTarget = part.includes("bill");

  const body = bodyTarget ? active : naturalFur;
  const face = /skin/.test(part) ? active : naturalSkin;
  const clothes = clothesTarget ? active : "#4F7FD9";
  const cape = capeTarget ? active : "#8B5CF6";
  const hair = hairTarget ? active : "#3A2A21";
  const hat = hatTarget ? active : "#22C55E";
  const bow = bowTarget ? active : "#F43F5E";
  const cheek = cheekTarget ? active : "#F7A6B8";
  const shoes = shoesTarget ? active : "#334155";
  const bill = billTarget ? active : "#F59E0B";

  return (
    <div className="h-full overflow-hidden rounded-[2rem] bg-white shadow-[0_22px_60px_rgba(79,70,229,0.14)] ring-1 ring-slate-200">
      <div className="flex items-center justify-between px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
        <span>{reveal ? "Memorize" : locked ? "Answer" : "Hidden target"}</span>
        <span>{question.targetPart}</span>
      </div>
      <svg viewBox="0 0 360 360" role="img" aria-label={`Original cartoon-style memory card for ${question.characterName}`} className="aspect-square h-full min-h-[360px] w-full bg-slate-50">
        <defs>
          <linearGradient id={`bg-${hash}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={bg[0]} />
            <stop offset="100%" stopColor={bg[1]} />
          </linearGradient>
          <filter id={`soft-${hash}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.18" />
          </filter>
          <clipPath id={`cardClip-${hash}`}>
            <rect x="18" y="18" width="324" height="324" rx="34" />
          </clipPath>
        </defs>
        <rect x="18" y="18" width="324" height="324" rx="34" fill={`url(#bg-${hash})`} />
        <g clipPath={`url(#cardClip-${hash})`} transform="translate(0 6) scale(1.04 1.04) translate(-7 -8)">
          <circle cx="292" cy="74" r="38" fill="#ffffff66" />
          <circle cx="64" cy="282" r="54" fill="#ffffff55" />
          <path d="M96 281 C120 206 242 206 266 281 L281 361 H81 Z" fill={clothes} stroke={ink} strokeWidth="7" filter={`url(#soft-${hash})`} />
          <path d="M92 228 C48 251 36 311 45 361 H109 C112 303 120 260 143 238 Z" fill={cape} opacity="0.92" stroke={ink} strokeWidth="6" />
          <path d="M268 228 C312 251 324 311 315 361 H251 C248 303 240 260 217 238 Z" fill={cape} opacity="0.92" stroke={ink} strokeWidth="6" />
          <circle cx="180" cy="139" r="78" fill={bodyTarget ? body : face} stroke={ink} strokeWidth="7" filter={`url(#soft-${hash})`} />
          <path d="M99 121 C111 56 248 49 262 123 C226 95 147 100 99 121 Z" fill={hair} stroke={ink} strokeWidth="7" strokeLinejoin="round" />
          <path d="M111 72 H249 L233 35 H128 Z" fill={hat} stroke={ink} strokeWidth="7" strokeLinejoin="round" />
          <path d="M101 78 H259" stroke={ink} strokeWidth="7" strokeLinecap="round" />
          <path d="M250 80 l38 20 l-38 20 l-38 -20 Z" fill={bow} stroke={ink} strokeWidth="6" strokeLinejoin="round" />
          <ellipse cx="145" cy="132" rx="18" ry="22" fill="#fff" stroke={ink} strokeWidth="5" />
          <ellipse cx="214" cy="132" rx="18" ry="22" fill="#fff" stroke={ink} strokeWidth="5" />
          <circle cx="149" cy="136" r="6" fill={ink} />
          <circle cx="210" cy="136" r="6" fill={ink} />
          <ellipse cx="104" cy="158" rx="18" ry="14" fill={cheek} stroke={ink} strokeWidth="4" />
          <ellipse cx="256" cy="158" rx="18" ry="14" fill={cheek} stroke={ink} strokeWidth="4" />
          <path d="M148 174 C162 192 198 192 212 174" fill="none" stroke={ink} strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="180" cy="155" rx="16" ry="10" fill={bill} stroke={ink} strokeWidth="5" />
          <path d="M124 247 C146 276 214 276 236 247" fill="#ffffff55" stroke={ink} strokeWidth="5" />
          <ellipse cx="129" cy="330" rx="36" ry="18" fill={shoes} stroke={ink} strokeWidth="6" />
          <ellipse cx="231" cy="330" rx="36" ry="18" fill={shoes} stroke={ink} strokeWidth="6" />
        </g>
        {targetHidden && (
          <g>
            <rect x="18" y="18" width="324" height="324" rx="34" fill="#f8fafc" opacity="0.38" />
            <circle cx="180" cy="154" r="98" fill="none" stroke={hidden} strokeWidth="18" opacity="0.82" />
            <text x="180" y="316" textAnchor="middle" fill="#475569" fontSize="18" fontWeight="800">match from memory</text>
          </g>
        )}
      </svg>
    </div>
  );
}
