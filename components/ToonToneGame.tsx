"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import CharacterMemoryCard from "./CharacterMemoryCard";
import { getDailyQuestions, todaySeed } from "@/lib/challenge";
import { deltaE, feedbackForGuess, hsbToHex, ratingFromAverage, scoreFromDelta, type Hsb } from "@/lib/color";

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

  const question = questions[roundIndex];
  const playerHex = hsbToHex(hsb);
  const currentResult = results[roundIndex];
  const complete = results.length === questions.length;
  const finalScore = average(results);
  const rating = ratingFromAverage(finalScore);
  const memorizing = started && !locked && !complete && now < flashUntil;

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 120);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!complete) return;
    const entry = { seed, score: finalScore, rating, completedAt: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as typeof entry[];
    localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...existing.filter((item) => item.seed !== seed)].slice(0, 30)));
  }, [complete, finalScore, rating, seed]);

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
    setFlashUntil(Date.now() + 1100);
  }

  function updateHsb(key: keyof Hsb, value: number) {
    if (locked) return;
    setHsb((current) => ({ ...current, [key]: value }));
  }

  function submit() {
    if (!question || locked) return;
    const diff = deltaE(playerHex, question.targetColorHex);
    const score = scoreFromDelta(diff, usedHint);
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
      <section className="mx-auto max-w-3xl rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-7">
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-500">Daily complete</p>
          <h2 className="mt-2 text-6xl font-black tracking-tight text-slate-950">{finalScore}/10</h2>
          <p className="mt-2 text-xl font-bold text-slate-700">{rating}</p>
          <canvas ref={canvasRef} width="700" height="540" className="mx-auto mt-5 hidden w-full max-w-md rounded-2xl border border-slate-200 bg-white sm:block" />
        </div>
        <div className="mt-6 space-y-2">
          {results.map((result, index) => (
            <div key={result.questionId} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3">
              <div>
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
    <section className="mx-auto max-w-md rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-xl font-black tracking-tight text-slate-950">Toon Tone</div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">{roundIndex + 1}/5</div>
      </div>

      <div className="text-center">
        <p className="text-sm font-medium text-slate-500">What color is</p>
        <h1 className="mx-auto mt-1 max-w-sm text-2xl font-black leading-tight tracking-tight text-slate-950">{question.characterName}&apos;s {question.targetPart}?</h1>
        <p className="mt-1 text-sm text-slate-500">{question.sourceTitle}</p>
      </div>

      <div className="mt-4">
        <CharacterMemoryCard question={question} reveal={memorizing} playerHex={playerHex} locked={locked} />
      </div>

      <div className="mt-4 rounded-2xl bg-slate-50 p-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl ring-1 ring-slate-200" style={{ backgroundColor: playerHex }} />
          <div>
            <p className="text-sm font-semibold text-slate-600">Your color</p>
            <p className="font-mono text-sm text-slate-500">{playerHex}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <Slider label="Hue" value={hsb.h} min={0} max={360} disabled={locked || !started} onChange={(value) => updateHsb("h", value)} gradient="linear-gradient(90deg,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)" />
        <Slider label="Saturation" value={hsb.s} min={0} max={100} disabled={locked || !started} onChange={(value) => updateHsb("s", value)} gradient={`linear-gradient(90deg,#fff,${hsbToHex({ h: hsb.h, s: 100, b: hsb.b })})`} />
        <Slider label="Brightness" value={hsb.b} min={0} max={100} disabled={locked || !started} onChange={(value) => updateHsb("b", value)} gradient={`linear-gradient(90deg,#000,${hsbToHex({ h: hsb.h, s: hsb.s, b: 100 })})`} />
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
        {!started ? (
          <button onClick={startRound} className="rounded-2xl bg-slate-950 px-5 py-4 font-bold text-white">Start</button>
        ) : (
          <button disabled={locked || memorizing} onClick={submit} className="rounded-2xl bg-slate-950 px-5 py-4 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">Lock guess</button>
        )}
        <button disabled={!started || locked || usedHint} onClick={() => setUsedHint(true)} className="rounded-2xl bg-slate-100 px-5 py-4 font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40">Hint</button>
      </div>

      {started && !locked && <button onClick={() => setFlashUntil(Date.now() + 1100)} className="mt-3 w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600">Flash target again</button>}
      {usedHint && <p className="mt-3 text-center text-sm font-medium text-slate-500">{hueHint(question.targetColorHex)}</p>}

      {currentResult && (
        <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-center">
          <p className="text-sm font-semibold text-slate-500">Round score</p>
          <p className="text-4xl font-black text-slate-950">{currentResult.score}</p>
          <p className="mt-2 text-sm text-slate-600">{currentResult.feedback}</p>
          {roundIndex < questions.length - 1 && <button onClick={nextRound} className="mt-4 w-full rounded-2xl bg-pink-500 px-5 py-4 font-bold text-white">Next</button>}
          {roundIndex === questions.length - 1 && <button onClick={() => setRoundIndex(roundIndex)} className="mt-4 w-full rounded-2xl bg-pink-500 px-5 py-4 font-bold text-white">View result</button>}
        </div>
      )}
    </section>
  );
}

function Slider({ label, value, min, max, disabled, gradient, onChange }: { label: string; value: number; min: number; max: number; disabled: boolean; gradient: string; onChange: (value: number) => void }) {
  return (
    <label className="block rounded-2xl bg-slate-50 p-4">
      <span className="mb-2 flex justify-between text-sm font-semibold text-slate-700"><span>{label}</span><span>{value}</span></span>
      <input className="h-7 w-full cursor-pointer appearance-none rounded-full border border-slate-200 disabled:cursor-not-allowed disabled:opacity-50" style={{ background: gradient }} type="range" min={min} max={max} value={value} disabled={disabled} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}
