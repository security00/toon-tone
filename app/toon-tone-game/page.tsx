import SeoGamePage, { seoGameMetadata } from "@/components/SeoGamePage";

export const metadata = seoGameMetadata(
  "Toon Tone Game | Play the Cartoon Color Guessing Challenge",
  "Play the Toon Tone game online. Guess cartoon, anime, superhero, movie, and game character colors with HSB sliders and daily scoring.",
  "/toon-tone-game"
);

export default function Page() {
  return (
    <SeoGamePage
      title="Toon Tone Game"
      canonical="/toon-tone-game"
      intro="Toon Tone is a cartoon color guessing game where you answer questions like what color is a character's shirt, hat, skin, cheeks, cape, or fur. Each round turns a familiar character detail into a quick memory challenge."
      sections={[
        { title: "What makes the Toon Tone game different?", body: "The Toon Tone game is not a normal color picker. It gives every color a character context, then asks you to rebuild the remembered tone with Hue, Saturation, and Brightness sliders. That makes each guess feel like a small cartoon trivia puzzle." },
        { title: "Built for fast daily play", body: "The daily challenge uses five fixed prompts, so players can finish a run quickly and compare scores. The loop is simple: read the prompt, adjust the sliders, lock the guess, and learn from the reveal." },
        { title: "Text-reference-only design", body: "Toon Tone uses written character references and abstract color UI in the MVP. The game does not need official images, screenshots, logos, audio, or video to create a playable color memory challenge." },
        { title: "Who should play Toon Tone?", body: "The game works for cartoon fans, anime fans, artists, designers, and casual players who like quick browser challenges. You do not need color theory knowledge to start, but every round can train your eye." },
      ]}
      tips={[
        "Start every Toon Tone round by naming the broad color family before you move the sliders.",
        "Use saturation to decide whether the target felt vivid, soft, dusty, or pastel.",
        "Use brightness last, because many close guesses fail by being too pale or too dark.",
        "After the reveal, notice which slider caused the biggest miss before the next round.",
      ]}
      faq={[
        ["Is Toon Tone free?", "Yes. The Toon Tone game is free to play in a modern browser."],
        ["How many rounds are in the daily game?", "The daily Toon Tone challenge has five rounds."],
        ["What do I guess in Toon Tone?", "You guess the color of a named character part, such as hair, a shirt, a hat, or a cape."],
        ["Does Toon Tone use official character images?", "No. The MVP uses text references and abstract color UI only."],
      ]}
    />
  );
}
