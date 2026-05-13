import type { Metadata } from "next";
import SeoGamePage from "@/components/SeoGamePage";

export const metadata: Metadata = {
  title: "Play Toon-Tone Online | Free Browser Color Guessing Game",
  description: "Play Toon-Tone online for free. Start the browser color guessing game, match character-inspired colors, and share your score.",
  alternates: { canonical: "/play/" },
};

export default function Page() {
  return (
    <SeoGamePage
      title="Play Toon-Tone Online"
      canonical="/play/"
      intro="Start the free browser version of Toon-Tone online. No install, no account, just a quick cartoon color memory challenge with HSB sliders and instant scoring."
      sections={[
        { title: "Open and play", body: "The playable Toon-Tone game loads at the top of the page. Press Start, read the first prompt, and begin matching the target color with the sliders." },
        { title: "No download required", body: "Toon-Tone runs in a modern browser, so you do not need an app store, desktop installer, extension, or account to play a daily run." },
        { title: "Designed for quick sessions", body: "Each run uses short rounds and immediate feedback. That makes the game easy to play during a break or share with a friend after one challenge." },
        { title: "Practice as much as you want", body: "The daily challenge gives a consistent prompt set, while the wider site explains how to improve color memory, scoring, and HSB control." },
      ]}
      tips={[
        "Use the daily challenge first if you want a comparable score.",
        "Play on a bright, consistent screen for cleaner color judgment.",
        "Read the prompt carefully before touching the sliders.",
        "Share the score card after the final round if you want friends to compare.",
      ]}
      faq={[
        ["Can I play Toon-Tone online for free?", "Yes. Toon-Tone is free to play in the browser."],
        ["Do I need to install anything?", "No. You can play directly on the website."],
        ["Does it work on phones?", "Yes. The sliders are designed for modern mobile and desktop browsers."],
        ["Where should I start?", "Start with the playable game at the top of the page, then read the guide links if you want better scores."],
      ]}
    />
  );
}
