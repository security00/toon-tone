import GuidePage, { guideMetadata } from "@/components/GuidePage";

export const metadata = guideMetadata(
  "How to Play Toon Tone | Daily Cartoon Color Guessing Guide",
  "Learn how to play Toon Tone, read each cartoon color prompt, tune HSB sliders, reveal your score, and share the daily challenge.",
  "/how-to-play/"
);

export default function Page() {
  return (
    <GuidePage
      title="How to Play Toon Tone"
      canonical="/how-to-play/"
      intro="Toon Tone is built to be playable in seconds: read the character prompt, remember the target part, adjust Hue, Saturation, and Brightness, then lock your guess and compare the result."
      sections={[
        { title: "Start the daily challenge", body: "Open the Toon Tone homepage and press Start. The daily challenge gives everyone the same five prompts, which makes scores easier to compare and share with friends." },
        { title: "Read the character and target part", body: "Each round names a character, source title, and exact target part such as hair, shirt, hat, skin, cape, or fur. Focus on that part instead of trying to rebuild the whole character." },
        { title: "Adjust hue first", body: "Hue controls the color family. In Toon Tone, it is usually best to decide whether the target is red, orange, yellow, green, blue, or purple before touching the other sliders." },
        { title: "Tune saturation and brightness", body: "Saturation controls how vivid the tone feels, while brightness controls how light or dark it is. Many close guesses lose points because the color family is right but the intensity or value is off." },
        { title: "Lock, reveal, and share", body: "After you lock the guess, Toon Tone reveals the target color, shows your score, and moves to the next round. Finish all five rounds to share or download your result card." },
      ]}
      faq={[
        ["How many rounds are in Toon Tone?", "The daily Toon Tone challenge uses five rounds."],
        ["Do I need an account?", "No. Toon Tone works in the browser without login."],
        ["What controls do I use?", "You use Hue, Saturation, and Brightness sliders to rebuild the remembered color."],
        ["Can I replay after finishing?", "Yes. You can keep practicing, but the daily seed keeps the main challenge consistent for comparison."],
      ]}
    />
  );
}
