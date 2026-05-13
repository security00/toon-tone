import type { Metadata } from "next";
import SeoGamePage from "@/components/SeoGamePage";

export const metadata: Metadata = {
  title: "Daily Toon Tone Challenge | 5-Round Color Memory Game",
  description: "Play today's fixed 5-round Toon Tone challenge. Everyone gets the same cartoon color memory prompts for easier score comparison.",
  alternates: { canonical: "/daily/" },
};

export default function Page() {
  return (
    <SeoGamePage
      title="Daily Toon Tone Challenge"
      canonical="/daily/"
      intro="Play today's fixed 5-round Toon Tone challenge. Everyone gets the same cartoon color memory questions for the day, so scores are easy to compare and share."
      sections={[
        { title: "Same prompts for everyone", body: "The daily Toon Tone challenge uses a shared seed, so players see the same five prompts on the same day. That makes scores easier to compare without needing an account." },
        { title: "Fast five-round format", body: "A full daily run is short enough for a quick break. Read each prompt, tune Hue, Saturation, and Brightness, lock your guess, then move to the next round." },
        { title: "Local score history", body: "Recent daily results can be saved in your browser localStorage, so you can track your own streaks and scores on the same device." },
        { title: "Shareable results", body: "After the fifth round, Toon Tone can generate share text or a score card so friends can compare the same daily challenge." },
      ]}
      tips={[
        "Play once before checking other people's scores so your guesses stay honest.",
        "Use the same device for daily comparisons when possible because screens can vary.",
        "Look for patterns in your misses across the five rounds.",
        "Try the guide pages if your score drops because of saturation or brightness mistakes.",
      ]}
      faq={[
        ["How many rounds are in the daily challenge?", "The daily Toon Tone challenge has five rounds."],
        ["Does everyone get the same challenge?", "Yes. The daily seed gives players the same prompt set for easier comparison."],
        ["Do I need to log in?", "No. The daily challenge works without an account."],
        ["Can I share my daily score?", "Yes. Finish all five rounds and use the sharing options."],
      ]}
    />
  );
}
