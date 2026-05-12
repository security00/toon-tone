import { QUESTIONS, type Question } from "./questions";

export function todaySeed(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

function hashSeed(seed: string): number {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed: string) {
  let state = hashSeed(seed) || 1;
  return () => {
    state = Math.imul(1664525, state) + 1013904223;
    return (state >>> 0) / 4294967296;
  };
}

export function getDailyQuestions(seed = todaySeed(), count = 5): Question[] {
  const random = seededRandom(seed);
  const pool = [...QUESTIONS];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

export function challengeId(seed = todaySeed()): string {
  return `daily-${seed}`;
}
