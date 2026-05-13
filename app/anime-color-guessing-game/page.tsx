import type { Metadata } from "next";
import SeoGamePage from "@/components/SeoGamePage";

export const metadata: Metadata = {
  title: "Anime Color Guessing Game | Match Anime Character Colors",
  description: "Play an anime color guessing game with Toon Tone. Match anime-inspired character colors from memory using HSB sliders and daily scoring.",
  alternates: { canonical: "/anime-color-guessing-game/" },
};

export default function Page() {
  return (
    <SeoGamePage
      title="Anime Color Guessing Game"
      canonical="/anime-color-guessing-game/"
      intro="Play anime and cartoon color memory rounds with text-only character references and HSB color controls. Toon Tone turns memorable anime-inspired colors into quick browser challenges."
      sections={[
        { title: "Why anime colors are fun to guess", body: "Anime characters often use strong hair colors, outfit accents, accessories, and contrast-heavy palettes. Those details make anime-inspired prompts a natural fit for a color memory game." },
        { title: "Not just the right hue", body: "A bright yellow, deep orange, soft pink, or cool blue can be recognizable, but Toon Tone also checks saturation and brightness. That makes the anime color guessing game more precise than a simple trivia answer." },
        { title: "Text-only prompt style", body: "The MVP uses written references and abstract color controls instead of official anime screenshots or artwork. Players still get a clear memory task without requiring image assets." },
        { title: "Good for anime fans and color practice", body: "Fans can test how well they remember familiar visual details, while artists can use the rounds as a fast exercise for palette awareness and color comparison." },
      ]}
      tips={[
        "Anime hair colors can be vivid but not always fully saturated; check intensity carefully.",
        "Outfit accents may be darker or lighter than memory suggests.",
        "Use hue first, then saturation, then brightness for calmer guesses.",
        "Compare each reveal to learn whether anime prompts make you over-brighten or over-saturate colors.",
      ]}
      faq={[
        ["Is Toon Tone only an anime game?", "No. Toon Tone includes anime-inspired prompts along with cartoons, superheroes, movies, games, and mascots."],
        ["Does the anime color guessing game use official images?", "No. The MVP uses text references and abstract color UI only."],
        ["What makes anime colors harder?", "Strong palettes can trick memory: the hue may be obvious, but saturation and brightness still need precision."],
        ["Can I play on mobile?", "Yes. Toon Tone works in a modern mobile browser with touch-friendly sliders."],
      ]}
    />
  );
}
