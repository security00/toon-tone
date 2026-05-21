import SeoGamePage, { seoGameMetadata } from "@/components/SeoGamePage";

export const metadata = seoGameMetadata(
  "Guess Cartoon Character Color | Toon Tone Color Memory Game",
  "Guess cartoon character colors from memory. Read the target part, tune HSB sliders, reveal the answer, and improve your Toon Tone score.",
  "/guess-cartoon-character-color"
);

export default function Page() {
  return (
    <SeoGamePage
      title="Guess Cartoon Character Color"
      canonical="/guess-cartoon-character-color"
      intro="Guess the color of a cartoon character's target part from memory, then compare your selected tone with the answer after submitting. Toon Tone makes the challenge specific by naming the character, source, and part to match."
      sections={[
        { title: "Focus on one character part", body: "Each prompt asks for a specific target such as hair, a jacket, a hat, a glove, skin, fur, or a cape. Narrowing the task to one part makes the color guess clearer and more skill-based." },
        { title: "Color recognition is not color reconstruction", body: "You may recognize a character color instantly when it is visible, but rebuilding it with sliders is harder. Toon Tone tests the gap between recognition and memory." },
        { title: "Use the reveal as feedback", body: "After you submit, the reveal helps you understand the miss. Maybe the hue was close but the brightness was too high, or the saturation was too dull for the character part." },
        { title: "Why this works without images", body: "The MVP uses written prompts and abstract color controls. That keeps the experience lightweight while still letting players practice cartoon character color memory." },
      ]}
      tips={[
        "Repeat the target part in your head before moving sliders.",
        "Match hue broadly before chasing exact shade details.",
        "For clothing and accessories, saturation can matter more than expected.",
        "For hair, fur, and skin, brightness often decides whether a guess feels believable.",
      ]}
      faq={[
        ["What does guess cartoon character color mean?", "It means recreating the color of a named character part from memory, not identifying the character from an image."],
        ["What character parts appear?", "Prompts can include hair, clothing, skin, fur, accessories, capes, hats, and other recognizable details."],
        ["Is this a multiple choice quiz?", "No. Toon Tone uses sliders, so you create the color yourself."],
        ["Can I use it for practice?", "Yes. Repeated rounds can help you notice hue, saturation, and brightness more clearly."],
      ]}
    />
  );
}
