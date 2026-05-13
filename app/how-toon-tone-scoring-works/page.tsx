import GuidePage, { guideMetadata } from "@/components/GuidePage";

export const metadata = guideMetadata(
  "How Toon Tone Scoring Works | Color Guessing Score Guide",
  "Understand how Toon Tone turns each cartoon color guess into a 0–10 score based on the distance between your selected color and the target.",
  "/how-toon-tone-scoring-works/"
);

export default function Page() {
  return (
    <GuidePage
      title="How Toon Tone Scoring Works"
      canonical="/how-toon-tone-scoring-works/"
      intro="Toon Tone scoring is meant to feel simple: the closer your selected color is to the hidden target, the higher your round score. The final daily score averages your five guesses."
      sections={[
        { title: "Every round has a hidden target color", body: "A Toon Tone prompt stores one target color for the named character part. Your slider position creates a guessed color, and the game compares those two colors after you lock the round." },
        { title: "The score rewards visual closeness", body: "Close matches earn high scores because they stay near the target across hue, saturation, and brightness. Bigger visual differences reduce the score." },
        { title: "Hue is not enough", body: "Choosing the right color family helps, but it does not guarantee a high Toon Tone score. Saturation and brightness can move the guess far away from the target even when hue feels correct." },
        { title: "Hints reduce the maximum score", body: "A hint can help when you are stuck, but it lowers the possible round score. That keeps hints useful without making perfect results too easy." },
        { title: "The final score is an average", body: "At the end of the five-round daily challenge, Toon Tone averages the round scores and gives the run a rating. Consistency matters more than one lucky perfect guess." },
      ]}
      faq={[
        ["What is a good Toon Tone score?", "A score above 7 usually means your color memory was close across several sliders. Higher scores require both good hue and careful brightness/saturation."],
        ["Why did my blue score low?", "It may have been the right general blue but too dark, too pale, or too saturated compared with the target."],
        ["Do hints affect scoring?", "Yes. Hints can narrow the direction of the color, but the maximum score for that round is reduced."],
        ["Is the final score one round or all rounds?", "The final daily score averages all five round scores."],
      ]}
    />
  );
}
