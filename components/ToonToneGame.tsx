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
  return `Hint used: this memory leans ${hue}. Max score for this round is now 9.`;
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
    ctx.fillStyle = "#fff7ed";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0f172a";
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
      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 5;
      ctx.strokeRect(x, 330, 70, 70);
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText(String(result.score), x + 14, 435);
    });
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("toon-tone.net", 40, 500);
  }, [complete, finalScore, rating, results, seed]);

  function updateHsb(key: keyof Hsb, value: number) {
    if (locked) return;
    setHsb((current) => ({ ...current, [key]: value }));
  }

  function submit() {
    if (!question || locked) return;
    const diff = deltaE(playerHex, question.targetColorHex);
    const score = scoreFromDelta(diff, usedHint);
    const result: RoundResult = {
      questionId: question.id,
      characterName: question.characterName,
      targetPart: question.targetPart,
      playerHex,
      targetHex: question.targetColorHex,
      score,
      delta: Number(diff.toFixed(1)),
      feedback: feedbackForGuess(playerHex, question.targetColorHex),
      usedHint,
    };
    setResults((items) => [...items, result]);
    setLocked(true);
  }

  function nextRound() {
    setRoundIndex((index) => index + 1);
    setHsb({ h: (hsb.h + 73) % 360, s: 72, b: 86 });
    setLocked(false);
    setUsedHint(false);
    setFlashUntil(Date.now() + 1200);
  }

  function restart() {
    setStarted(true);
    setRoundIndex(0);
    setHsb(defaultHsb);
    setLocked(false);
    setUsedHint(false);
    setFlashUntil(Date.now() + 1200);
    setResults([]);
    setCopied(false);
  }

  async function share() {
    const text = `I scored ${finalScore}/10 (${rating}) on Toon-Tone Daily ${seed}. Can you beat my color memory? https://toon-tone.net/?challenge=${seed}`;
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
    const best = [...results].sort((a, b) => b.score - a.score)[0];
    const weakest = [...results].sort((a, b) => a.score - b.score)[0];
    return (
      <section className="rounded-[2rem] border-4 border-slate-950 bg-white p-4 shadow-[10px_10px_0_#0f172a] sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl bg-amber-100 p-6 text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-pink-600">Daily complete</p>
            <h2 className="mt-3 text-6xl font-black">{finalScore}/10</h2>
            <p className="mt-2 text-2xl font-black">{rating}</p>
            <p className="mt-4 text-slate-700">Best: {best.characterName} · Hardest: {weakest.characterName}</p>
            <canvas ref={canvasRef} width="700" height="540" className="mt-5 hidden w-full rounded-2xl border-2 border-slate-950 bg-white sm:block" />
          </div>
          <div>
            <div className="grid gap-3">
              {results.map((result, index) => (
                <div key={result.questionId} className="flex items-center justify-between gap-3 rounded-2xl border-2 border-slate-200 p-3">
                  <div>
                    <p className="font-black">Round {index + 1}: {result.characterName}&apos;s {result.targetPart}</p>
                    <p className="text-sm text-slate-600">ΔE {result.delta} · {result.feedback}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-8 w-8 rounded-full border-2 border-slate-950" style={{ backgroundColor: result.playerHex }} />
                    <span className="h-8 w-8 rounded-full border-2 border-slate-950" style={{ backgroundColor: result.targetHex }} />
                    <strong>{result.score}</strong>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <button onClick={share} className="rounded-full border-2 border-slate-950 bg-[#ff4f9a] px-4 py-3 font-black text-white shadow-[4px_4px_0_#0f172a]">{copied ? "Copied" : "Share"}</button>
              <button onClick={downloadCard} className="rounded-full border-2 border-slate-950 bg-white px-4 py-3 font-black shadow-[4px_4px_0_#0f172a]">Download PNG</button>
              <button onClick={restart} className="rounded-full border-2 border-slate-950 bg-[#06d6a0] px-4 py-3 font-black shadow-[4px_4px_0_#0f172a]">Play Again</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border-4 border-slate-950 bg-white p-4 shadow-[10px_10px_0_#0f172a] sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-pink-600">Daily Challenge · {seed}</p>
          <h1 className="mt-1 text-3xl font-black sm:text-5xl">Toon Tone Game</h1>
        </div>
        <div className="rounded-full border-2 border-slate-950 bg-amber-200 px-4 py-2 font-black">Round {roundIndex + 1}/5</div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.15fr_0.75fr]">
        <div className="rounded-3xl bg-slate-950 p-5 text-white">
          <p className="text-sm font-bold text-emerald-200">What color is...</p>
          <h2 className="mt-3 text-3xl font-black leading-tight">{question.characterName}&apos;s {question.targetPart}?</h2>
          <p className="mt-3 text-slate-300">from {question.sourceTitle}</p>
          <p className="mt-5 rounded-2xl border border-white/20 p-3 text-sm text-slate-300">Memorize the highlighted abstract character part. The color flashes briefly, then hides. No official images are used.</p>
          {!started && <button onClick={() => { setStarted(true); setFlashUntil(Date.now() + 1200); }} className="mt-5 w-full rounded-full border-2 border-white bg-[#06d6a0] px-5 py-3 font-black text-slate-950">Start Daily</button>}
          {started && !locked && <button onClick={() => setFlashUntil(Date.now() + 1200)} className="mt-5 w-full rounded-full border-2 border-white bg-white px-5 py-3 font-black text-slate-950">Flash target again</button>}
        </div>

        <div className="rounded-3xl bg-amber-100 p-5">
          <div className="grid gap-4 sm:grid-cols-[0.86fr_1.14fr] sm:items-center">
            <CharacterMemoryCard question={question} reveal={memorizing} playerHex={playerHex} locked={locked} />
            <div className="space-y-4">
              <div className="rounded-3xl border-2 border-slate-950 bg-white p-4">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">Your color</p>
                <div className="mt-3 h-20 rounded-2xl border-2 border-slate-950" style={{ backgroundColor: playerHex }} />
              </div>
              <Slider label="Hue" value={hsb.h} min={0} max={360} disabled={locked || !started} onChange={(value) => updateHsb("h", value)} gradient="linear-gradient(90deg,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)" />
              <Slider label="Saturation" value={hsb.s} min={0} max={100} disabled={locked || !started} onChange={(value) => updateHsb("s", value)} gradient={`linear-gradient(90deg,#fff,${hsbToHex({ h: hsb.h, s: 100, b: hsb.b })})`} />
              <Slider label="Brightness" value={hsb.b} min={0} max={100} disabled={locked || !started} onChange={(value) => updateHsb("b", value)} gradient={`linear-gradient(90deg,#000,${hsbToHex({ h: hsb.h, s: hsb.s, b: 100 })})`} />
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button disabled={!started || locked || memorizing} onClick={submit} className="flex-1 rounded-full border-2 border-slate-950 bg-[#ff4f9a] px-5 py-3 font-black text-white shadow-[4px_4px_0_#0f172a] disabled:cursor-not-allowed disabled:opacity-40">Lock your guess</button>
            <button disabled={!started || locked || usedHint} onClick={() => setUsedHint(true)} className="rounded-full border-2 border-slate-950 bg-white px-5 py-3 font-black shadow-[4px_4px_0_#0f172a] disabled:cursor-not-allowed disabled:opacity-40">Hint</button>
          </div>
          {usedHint && <p className="mt-3 text-sm font-bold text-slate-700">{hueHint(question.targetColorHex)}</p>}
        </div>

        <aside className="rounded-3xl border-2 border-slate-200 p-5">
          <h3 className="text-xl font-black">Score</h3>
          <p className="mt-1 text-sm text-slate-600">Average updates after each locked round.</p>
          <div className="mt-4 text-5xl font-black">{results.length ? average(results) : "--"}</div>
          {currentResult && (
            <div className="mt-5 space-y-3">
              <p className="font-black">Round score: {currentResult.score}/10</p>
              <div className="grid grid-cols-2 gap-3 text-center text-sm font-bold">
                <div><div className="h-16 rounded-2xl border-2 border-slate-950" style={{ backgroundColor: currentResult.playerHex }} /><p className="mt-1">You</p></div>
                <div><div className="h-16 rounded-2xl border-2 border-slate-950" style={{ backgroundColor: currentResult.targetHex }} /><p className="mt-1">Answer</p></div>
              </div>
              <p className="text-sm text-slate-700">{currentResult.feedback}</p>
              {roundIndex < questions.length - 1 && <button onClick={nextRound} className="w-full rounded-full border-2 border-slate-950 bg-[#06d6a0] px-4 py-3 font-black shadow-[4px_4px_0_#0f172a]">Next Round</button>}
              {roundIndex === questions.length - 1 && <button onClick={() => setRoundIndex(roundIndex)} className="w-full rounded-full border-2 border-slate-950 bg-[#06d6a0] px-4 py-3 font-black shadow-[4px_4px_0_#0f172a]">View Results</button>}
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

function Slider({ label, value, min, max, disabled, gradient, onChange }: { label: string; value: number; min: number; max: number; disabled: boolean; gradient: string; onChange: (value: number) => void }) {
  return (
    <label className="block">
      <span className="flex justify-between text-sm font-black"><span>{label}</span><span>{value}</span></span>
      <input
        className="mt-2 h-9 w-full cursor-pointer appearance-none rounded-full border-2 border-slate-950 bg-transparent px-1 disabled:cursor-not-allowed disabled:opacity-50"
        style={{ background: gradient }}
        type="range"
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
