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
    <div className="relative min-h-[320px] overflow-hidden rounded-2xl shadow-sm sm:min-h-[360px] sm:rounded-[2rem] sm:shadow-[0_22px_60px_rgba(79,70,229,0.18)]">
      <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-white/25 px-4 py-1 text-sm font-black text-white backdrop-blur">
        {progress}
      </div>
      <div className="grid h-full min-h-[320px] grid-rows-2 sm:min-h-[360px]">
        <section className="relative p-5 text-white sm:p-7" style={{ backgroundColor: playerHex }}>
          <div className="absolute right-5 top-14 text-right sm:right-7">
            <p className="text-5xl font-black leading-none tracking-tight drop-shadow-sm sm:text-6xl">{score.toFixed(2)}</p>
            <p className="mt-2 text-base font-bold drop-shadow-sm sm:text-lg">{feedback}</p>
          </div>
          <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/75 sm:text-xs sm:tracking-[0.22em]">Your selection</p>
            <p className="mt-1 text-xl font-black sm:text-2xl">{playerLabel}</p>
          </div>
        </section>
        <section className="relative p-5 text-white sm:p-7" style={{ backgroundColor: targetHex }}>
          <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/75 sm:text-xs sm:tracking-[0.22em]">Original</p>
            <p className="mt-1 text-xl font-black sm:text-2xl">{targetLabel}</p>
          </div>
        </section>
      </div>
      <button
        type="button"
        onClick={isLastRound ? onFinish : onNext}
        aria-label={isLastRound ? "View final result" : "Next round"}
        className="absolute bottom-5 right-5 grid h-12 w-12 place-items-center rounded-full bg-white text-2xl font-black text-slate-950 shadow-[0_14px_30px_rgba(15,23,42,0.24)] transition hover:scale-105 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14 sm:text-3xl"
      >
        →
      </button>
    </div>
  );
}
