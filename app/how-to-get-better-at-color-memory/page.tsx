import GuidePage, { guideMetadata } from "@/components/GuidePage";

export const metadata = guideMetadata(
  "How to Get Better at Color Memory | Toon Tone Tips",
  "Improve your Toon Tone score with practical color memory tips for hue, saturation, brightness, and cartoon character color prompts.",
  "/how-to-get-better-at-color-memory"
);

export default function Page() {
  return (
    <GuidePage
      title="How to Get Better at Color Memory"
      canonical="/how-to-get-better-at-color-memory"
      intro="Better Toon Tone scores come from slowing the guess down. Treat hue, saturation, and brightness as three separate memory questions instead of one vague color impression."
      sections={[
        { title: "Name the hue family first", body: "Before moving sliders, say the color family in your head. Is it closer to red-orange, yellow-green, cyan, blue, violet, or pink? This gives every Toon Tone guess a stable anchor." },
        { title: "Check whether the color is vivid or muted", body: "Cartoon colors can look bright, but many are less saturated than memory suggests. If your guesses feel loud or neon, lower saturation before changing hue." },
        { title: "Use brightness to match weight", body: "Brightness changes the visual weight of a color. Hair, fur, skin, and clothing can all feel wrong if the value is too pale or too heavy, even when hue is close." },
        { title: "Learn from each reveal", body: "After each Toon Tone reveal, decide which slider caused most of the miss. This turns every round into feedback instead of just a score." },
        { title: "Practice by character part", body: "Clothes, hats, hair, body colors, and accessories behave differently. Grouping misses by target part helps you see which kinds of cartoon colors are hardest for you." },
      ]}
      faq={[
        ["Can Toon Tone train my eye?", "It can help you practice color attention by repeatedly observing, remembering, adjusting, and comparing colors."],
        ["What should I adjust first?", "Start with hue, then tune saturation, then brightness."],
        ["Why do close guesses still lose points?", "A guess can be close in hue but too bright, too dull, or too saturated."],
        ["Is this a color vision test?", "No. Toon Tone is a casual game and practice tool, not a medical or diagnostic test."],
      ]}
    />
  );
}
