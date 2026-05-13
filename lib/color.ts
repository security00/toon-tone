export type Hsb = { h: number; s: number; b: number };
export type Rgb = { r: number; g: number; b: number };
export type Lab = { l: number; a: number; b: number };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function hsbToRgb({ h, s, b }: Hsb): Rgb {
  const hue = ((h % 360) + 360) % 360;
  const saturation = clamp(s, 0, 100) / 100;
  const brightness = clamp(b, 0, 100) / 100;
  const c = brightness * saturation;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = brightness - c;
  let rp = 0;
  let gp = 0;
  let bp = 0;

  if (hue < 60) [rp, gp, bp] = [c, x, 0];
  else if (hue < 120) [rp, gp, bp] = [x, c, 0];
  else if (hue < 180) [rp, gp, bp] = [0, c, x];
  else if (hue < 240) [rp, gp, bp] = [0, x, c];
  else if (hue < 300) [rp, gp, bp] = [x, 0, c];
  else [rp, gp, bp] = [c, 0, x];

  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255),
  };
}

export function rgbToHex({ r, g, b }: Rgb): string {
  return `#${[r, g, b].map((v) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

export function hsbToHex(hsb: Hsb): string {
  return rgbToHex(hsbToRgb(hsb));
}

export function hexToRgb(hex: string): Rgb {
  const clean = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return { r: 0, g: 0, b: 0 };
  return {
    r: Number.parseInt(clean.slice(0, 2), 16),
    g: Number.parseInt(clean.slice(2, 4), 16),
    b: Number.parseInt(clean.slice(4, 6), 16),
  };
}

export function hexToHsb(hex: string): Hsb {
  const { r, g, b } = hexToRgb(hex);
  const rp = r / 255;
  const gp = g / 255;
  const bp = b / 255;
  const max = Math.max(rp, gp, bp);
  const min = Math.min(rp, gp, bp);
  const delta = max - min;
  let h = 0;
  if (delta !== 0) {
    if (max === rp) h = 60 * (((gp - bp) / delta) % 6);
    else if (max === gp) h = 60 * ((bp - rp) / delta + 2);
    else h = 60 * ((rp - gp) / delta + 4);
  }
  if (h < 0) h += 360;
  return {
    h: Math.round(h),
    s: Math.round(max === 0 ? 0 : (delta / max) * 100),
    b: Math.round(max * 100),
  };
}

function pivotRgb(value: number) {
  const v = value / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function pivotXyz(value: number) {
  return value > 0.008856 ? Math.cbrt(value) : 7.787 * value + 16 / 116;
}

export function rgbToLab(rgb: Rgb): Lab {
  const r = pivotRgb(rgb.r);
  const g = pivotRgb(rgb.g);
  const b = pivotRgb(rgb.b);

  const x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  const y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0;
  const z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  const fx = pivotXyz(x);
  const fy = pivotXyz(y);
  const fz = pivotXyz(z);

  return {
    l: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
}

export function deltaE(hexA: string, hexB: string): number {
  const a = rgbToLab(hexToRgb(hexA));
  const b = rgbToLab(hexToRgb(hexB));
  return Math.sqrt((a.l - b.l) ** 2 + (a.a - b.a) ** 2 + (a.b - b.b) ** 2);
}

export function scoreFromDelta(delta: number, usedHint = false): number {
  const raw = 10 * Math.exp(-delta / 28);
  const capped = Math.max(0, Math.min(10, raw));
  return Number(Math.min(usedHint ? 9 : 10, capped).toFixed(1));
}

export function ratingFromAverage(score: number): string {
  if (score >= 9.5) return "Perfect Memory";
  if (score >= 8.5) return "Toon Expert";
  if (score >= 7) return "Pretty Close";
  if (score >= 5) return "Getting Warm";
  return "Needs a Rewatch";
}

function hueFamily(hue: number): string {
  if (hue < 20 || hue >= 345) return "red";
  if (hue < 45) return "orange-red";
  if (hue < 75) return "yellow";
  if (hue < 155) return "green";
  if (hue < 195) return "cyan";
  if (hue < 255) return "blue";
  if (hue < 285) return "purple";
  if (hue < 345) return "pink/magenta";
  return "color";
}

export function feedbackForGuess(playerHex: string, targetHex: string): string {
  const guess = hexToHsb(playerHex);
  const target = hexToHsb(targetHex);
  const hueShift = ((guess.h - target.h + 540) % 360) - 180;
  const hueDiff = Math.abs(hueShift);
  const saturationDiff = guess.s - target.s;
  const brightnessDiff = guess.b - target.b;

  const misses = [
    { key: "hue", weight: hueDiff / 22 },
    { key: "saturation", weight: Math.abs(saturationDiff) / 16 },
    { key: "brightness", weight: Math.abs(brightnessDiff) / 14 },
  ].sort((a, b) => b.weight - a.weight);

  switch (misses[0]?.key) {
    case "hue":
      if (hueDiff > 22) return `Your hue aimed closer to ${hueFamily(guess.h)}; the target sits nearer ${hueFamily(target.h)}.`;
      break;
    case "saturation":
      if (Math.abs(saturationDiff) > 16) return saturationDiff > 0 ? "Your guess was too vivid; lower saturation next time." : "Your guess was too muted; push saturation higher.";
      break;
    case "brightness":
      if (Math.abs(brightnessDiff) > 14) return brightnessDiff > 0 ? "Your guess was too bright; darken the value next time." : "Your guess was too dark; lift brightness next time.";
      break;
  }

  if (hueDiff > 22) return `Your hue aimed closer to ${hueFamily(guess.h)}; the target sits nearer ${hueFamily(target.h)}.`;
  if (Math.abs(saturationDiff) > 16) return saturationDiff > 0 ? "Your guess was too vivid; lower saturation next time." : "Your guess was too muted; push saturation higher.";
  if (Math.abs(brightnessDiff) > 14) return brightnessDiff > 0 ? "Your guess was too bright; darken the value next time." : "Your guess was too dark; lift brightness next time.";
  return "Very close — your color memory was locked in.";
}
