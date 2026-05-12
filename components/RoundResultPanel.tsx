type Props = {
  progress: string;
  playerHex: string;
  targetHex: string;
  score: number;
  feedback: string;
  playerLabel: string;
  targetLabel: string;
  isLastRound: boolean;
  onNext: () => void;
  onFinish: () => void;
};

export default function RoundResultPanel({ progress, playerHex, targetHex, score, feedback, playerLabel, targetLabel, isLastRound, onNext, onFinish }: Props) {
  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_22px_60px_rgba(79,70,229,0.18)]">
      <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-white/25 px-4 py-1 text-sm font-black text-white backdrop-blur">
        {progress}
      </div>
      <div className="grid h-full min-h-[360px] grid-rows-2">
        <section className="relative p-7 text-white" style={{ backgroundColor: playerHex }}>
          <div className="absolute right-7 top-14 text-right">
            <p className="text-6xl font-black leading-none tracking-tight drop-shadow-sm">{score.toFixed(2)}</p>
            <p className="mt-2 text-lg font-bold drop-shadow-sm">{feedback}</p>
          </div>
          <div className="absolute bottom-7 left-7">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-white/75">Your selection</p>
            <p className="mt-1 text-2xl font-black">{playerLabel}</p>
          </div>
        </section>
        <section className="relative p-7 text-white" style={{ backgroundColor: targetHex }}>
          <div className="absolute bottom-7 left-7">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-white/75">Original</p>
            <p className="mt-1 text-2xl font-black">{targetLabel}</p>
          </div>
        </section>
      </div>
      <button
        type="button"
        onClick={isLastRound ? onFinish : onNext}
        aria-label={isLastRound ? "View final result" : "Next round"}
        className="absolute bottom-6 right-6 grid h-14 w-14 place-items-center rounded-full bg-white text-3xl font-black text-slate-950 shadow-[0_14px_30px_rgba(15,23,42,0.24)] transition hover:scale-105"
      >
        →
      </button>
    </div>
  );
}
