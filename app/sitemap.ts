import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const routes = [
  "",
  "/daily",
  "/play",
  "/toon-tone-game",
  "/cartoon-color-guessing-game",
  "/guess-cartoon-character-color",
  "/character-color-game",
  "/anime-color-guessing-game",
  "/leaderboard",
  "/how-to-play",
  "/how-to-get-better-at-color-memory",
  "/how-toon-tone-scoring-works",
  "/about",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://toon-tone.net${route}`,
    lastModified: "2026-05-13",
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
