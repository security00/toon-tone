"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CharacterMemoryCard from "./CharacterMemoryCard";
import ColorMatchPanel from "./ColorMatchPanel";
import RoundResultPanel from "./RoundResultPanel";
import { getDailyQuestions, todaySeed } from "@/lib/challenge";
import { deltaE, feedbackForGuess, hexToHsb, hsbToHex, ratingFromAverage, scoreFromDelta, type Hsb } from "@/lib/color";

type RoundResult = {
  questionId: string;
  characterName: string;
  targetPart: string;
  playerHex: string;
  targetHex: string;
  score: number;
  delta: number;
  feedback: string;
  usedHint: boolean;
};

const STORAGE_KEY = "toon-tone-history-v1";
const defaultHsb: Hsb = { h: 210, s: 76, b: 86 };

function average(results: RoundResult[]) {
  if (!results.length) return 0;
  return Number((results.reduce((sum, result) => sum + result.score, 0) / results.length).toFixed(1));
}

function hueHint(targetHex: string) {
  const hue = Number.parseInt(targetHex.slice(1, 3), 16) > Number.parseInt(targetHex.slice(5, 7), 16) ? "warm" : "cool";
  return `Hint: this color leans ${hue}. Max score is now 9.`;
}

function perfectResults(questions: ReturnType<typeof getDailyQuestions>): RoundResult[] {
  return questions.map((item) => ({
    questionId: item.id,
    characterName: item.characterName,
    targetPart: item.targetPart,
    playerHex: item.targetColorHex,
    targetHex: item.targetColorHex,
    score: 10,
    delta: 0,
    feedback: "Perfect match — your color memory was locked in.",
    usedHint: false,
  }));
}

export default function ToonToneGame() {
  const seed = todaySeed();
  const questions = useMemo(() => getDailyQuestions(seed), [seed]);
  const [started, setStarted] = useState(false);
  const [roundIndex, setRoundIndex] = useState(0);
  const [hsb, setHsb] = useState<Hsb>(defaultHsb);
  const [locked, setLocked] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [flashUntil, setFlashUntil] = useState(0);
  const [now, setNow] = useState(0);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const lastTickRef = useRef(0);

  const question = questions[roundIndex];
  const playerHex = hsbToHex(hsb);
  const currentResult = results[roundIndex];
  const complete = results.length === questions.length;
  const finalScore = average(results);
  const rating = ratingFromAverage(finalScore);
  const memorizing = started && !locked && !complete && now < flashUntil;
  const playerHsb = hexToHsb(playerHex);
  const targetHsb = question ? hexToHsb(question.targetColorHex) : defaultHsb;

  const playTone = useCallback((frequency: number, duration = 0.08, type: OscillatorType = "sine", gainValue = 0.035, delay = 0) => {
    if (typeof window === "undefined") return;
    const AudioContextCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) return;
    const context = audioRef.current ?? new AudioContextCtor();
    audioRef.current = context;
    const startAt = context.currentTime + delay;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startAt);
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(gainValue, startAt + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(startAt);
    oscillator.stop(startAt + duration + 0.02);
  }, []);

  const playScoreSound = useCallback((score: number) => {
    if (score >= 8) {
      playTone(523, 0.1, "triangle", 0.07);
      playTone(659, 0.1, "triangle", 0.066, 0.08);
      playTone(784, 0.12, "triangle", 0.064, 0.16);
      playTone(1047, 0.18, "sine", 0.055, 0.27);
      playTone(1319, 0.16, "sine", 0.035, 0.39);
      return;
    }
    if (score >= 5) {
      playTone(392, 0.1, "triangle", 0.045);
      playTone(494, 0.12, "triangle", 0.042, 0.11);
      return;
    }
    playTone(196, 0.18, "sawtooth", 0.055);
    playTone(147, 0.24, "sawtooth", 0.05, 0.14);
    playTone(98, 0.32, "square", 0.035, 0.34);
  }, [playTone]);

  const playFinalSound = useCallback((score: number) => {
    if (score >= 8) {
      playTone(523, 0.12, "triangle", 0.075);
      playTone(659, 0.12, "triangle", 0.072, 0.09);
      playTone(784, 0.13, "triangle", 0.07, 0.18);
      playTone(1047, 0.22, "sine", 0.064, 0.3);
      playTone(1319, 0.18, "sine", 0.046, 0.45);
      playTone(1568, 0.16, "sine", 0.038, 0.58);
      playTone(1047, 0.3, "triangle", 0.048, 0.72);
      playTone(1319, 0.28, "sine", 0.032, 0.76);
      return;
    }
    if (score >= 5) {
      playTone(330, 0.12, "triangle", 0.05);
      playTone(440, 0.16, "triangle", 0.048, 0.14);
      playTone(554, 0.2, "sine", 0.04, 0.31);
      return;
    }
    playTone(220, 0.2, "sawtooth", 0.06);
    playTone(165, 0.26, "sawtooth", 0.055, 0.18);
    playTone(110, 0.38, "square", 0.04, 0.42);
  }, [playTone]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 120);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("debug") !== "perfect") return;
    const timer = window.setTimeout(() => {
      setStarted(true);
      setRoundIndex(questions.length - 1);
      setHsb(hexToHsb(questions[questions.length - 1]?.targetColorHex ?? hsbToHex(defaultHsb)));
      setLocked(true);
      setUsedHint(false);
      setFlashUntil(0);
      setResults(perfectResults(questions));
    }, 0);
    return () => window.clearTimeout(timer);
  }, [questions]);

  useEffect(() => {
    if (!complete) return;
    playFinalSound(finalScore);
    const entry = { seed, score: finalScore, rating, completedAt: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as typeof entry[];
    localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...existing.filter((item) => item.seed !== seed)].slice(0, 30)));
  }, [complete, finalScore, playFinalSound, rating, seed]);

  useEffect(() => {
    if (!complete || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#111827";
    ctx.font = "bold 42px sans-serif";
    ctx.fillText("Toon-Tone Daily", 40, 70);
    ctx.font = "bold 88px sans-serif";
    ctx.fillText(`${finalScore}/10`, 40, 175);
    ctx.font = "bold 34px sans-serif";
    ctx.fillText(rating, 40, 230);
    ctx.font = "24px sans-serif";
    ctx.fillText(seed, 40, 280);
    results.forEach((result, index) => {
      const x = 42 + index * 92;
      ctx.fillStyle = result.playerHex;
      ctx.fillRect(x, 330, 70, 70);
      ctx.strokeStyle = "#111827";
      ctx.lineWidth = 4;
      ctx.strokeRect(x, 330, 70, 70);
      ctx.fillStyle = "#111827";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText(String(result.score), x + 14, 435);
    });
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("toon-tone.net", 40, 500);
  }, [complete, finalScore, rating, results, seed]);

  function startRound() {
    setStarted(true);
    playTone(523, 0.08, "triangle", 0.035);
    setFlashUntil(Date.now() + 1100);
  }

  function updateHsb(key: keyof Hsb, value: number) {
    if (locked) return;
    const nowMs = Date.now();
    if (nowMs - lastTickRef.current > 55) {
      lastTickRef.current = nowMs;
      playTone(260 + value * 1.7, 0.035, "square", 0.012);
    }
    setHsb((current) => ({ ...current, [key]: value }));
  }

  function submit() {
    if (!question || locked) return;
    const diff = deltaE(playerHex, question.targetColorHex);
    const score = scoreFromDelta(diff, usedHint);
    playScoreSound(score);
    setResults((items) => [...items, {
      questionId: question.id,
      characterName: question.characterName,
      targetPart: question.targetPart,
      playerHex,
      targetHex: question.targetColorHex,
      score,
      delta: Number(diff.toFixed(1)),
      feedback: feedbackForGuess(playerHex, question.targetColorHex),
      usedHint,
    }]);
    setLocked(true);
  }

  function revealFlash() {
    playTone(740, 0.07, "triangle", 0.026);
    setFlashUntil(Date.now() + 1100);
  }

  function nextRound() {
    setRoundIndex((index) => index + 1);
    setHsb({ h: (hsb.h + 73) % 360, s: 72, b: 86 });
    setLocked(false);
    setUsedHint(false);
    setFlashUntil(Date.now() + 1100);
  }

  function restart() {
    setStarted(true);
    setRoundIndex(0);
    setHsb(defaultHsb);
    setLocked(false);
    setUsedHint(false);
    setFlashUntil(Date.now() + 1100);
    setResults([]);
    setCopied(false);
  }

  async function share() {
    const text = `I scored ${finalScore}/10 (${rating}) on Toon-Tone Daily ${seed}. Can you beat me? https://toon-tone.net/?challenge=${seed}`;
    if (navigator.share) {
      await navigator.share({ title: "Toon-Tone Daily", text, url: `https://toon-tone.net/?challenge=${seed}` });
      return;
    }
    await navigator.clipboard.writeText(text);
    setCopied(true);
  }

  function downloadCard() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `toon-tone-${seed}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  if (complete) {
    return (
      <section className="mx-auto max-w-3xl rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:rounded-3xl sm:p-7">
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-500">Daily complete</p>
          <h2 className="mt-2 text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">{finalScore}/10</h2>
          <p className="mt-2 text-xl font-bold text-slate-700">{rating}</p>
          <canvas ref={canvasRef} width="700" height="540" className="mx-auto mt-5 hidden w-full max-w-md rounded-2xl border border-slate-200 bg-white sm:block" />
        </div>
        <div className="mt-6 space-y-2">
          {results.map((result, index) => (
            <div key={result.questionId} className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-900">{index + 1}. {result.characterName} · {result.targetPart}</p>
                <p className="text-xs text-slate-500">ΔE {result.delta} · {result.feedback}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-7 w-7 rounded-full ring-1 ring-slate-300" style={{ backgroundColor: result.playerHex }} />
                <span className="h-7 w-7 rounded-full ring-1 ring-slate-300" style={{ backgroundColor: result.targetHex }} />
                <strong>{result.score}</strong>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <button onClick={share} className="rounded-2xl bg-slate-950 px-4 py-3 font-bold text-white">{copied ? "Copied" : "Share"}</button>
          <button onClick={downloadCard} className="rounded-2xl bg-slate-100 px-4 py-3 font-bold text-slate-950">PNG</button>
          <button onClick={restart} className="rounded-2xl bg-pink-500 px-4 py-3 font-bold text-white">Play again</button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl">
      <div className="mb-4 text-center sm:mb-6">
        <p className="text-sm font-bold text-slate-500">Toon Tone · {roundIndex + 1}/5</p>
        <h1 className="mx-auto mt-2 max-w-4xl text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
          <span className="sm:hidden">Match </span>
          <span className="hidden sm:inline">What is the color of </span>
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">{question.characterName}&apos;s {question.targetPart}</span>
          <span className="hidden sm:inline">?</span>
        </h1>
        <p className="mt-2 text-sm font-medium text-slate-500">from {question.sourceTitle}</p>
      </div>

      <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-stretch">
        <div className="min-w-0">
          <CharacterMemoryCard question={question} reveal={memorizing} playerHex={playerHex} locked={locked} />
        </div>
        {currentResult ? (
          <div className="min-w-0">
            <RoundResultPanel
              progress={`${roundIndex + 1}/5`}
              playerHex={currentResult.playerHex}
              targetHex={currentResult.targetHex}
              score={currentResult.score}
              feedback={currentResult.score >= 8 ? "Great eye!" : currentResult.score >= 5 ? "Nice try!" : "Tough one!"}
              playerLabel={`H${playerHsb.h} S${playerHsb.s} B${playerHsb.b}`}
              targetLabel={`H${targetHsb.h} S${targetHsb.s} B${targetHsb.b}`}
              isLastRound={roundIndex === questions.length - 1}
              onNext={nextRound}
              onFinish={() => setRoundIndex(roundIndex)}
            />
          </div>
        ) : (
          <div className="min-w-0">
            <ColorMatchPanel
              hsb={hsb}
              playerHex={playerHex}
              started={started}
              locked={locked}
              memorizing={memorizing}
              usedHint={usedHint}
              progress={`${roundIndex + 1}/5`}
              onChange={updateHsb}
              onStart={startRound}
              onSubmit={submit}
              onHint={() => setUsedHint(true)}
            />
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
        {started && !locked && <button onClick={revealFlash} className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 shadow-sm sm:w-auto">Flash target again</button>}
        {usedHint && <p className="text-center text-sm font-medium text-slate-500">{hueHint(question.targetColorHex)}</p>}
      </div>

    </section>
  );
}
