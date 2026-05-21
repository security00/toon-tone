import SeoGamePage, { seoGameMetadata } from "@/components/SeoGamePage";

export const metadata = seoGameMetadata(
  "Character Color Game | Guess Cartoon and Anime Colors",
  "Play a character color game for cartoons, anime, superheroes, movies, and games. Match target parts with HSB sliders and compare your score.",
  "/character-color-game"
);

export default function Page() {
  return (
    <SeoGamePage
      title="Character Color Game"
      canonical="/character-color-game"
      intro="A fast character color memory game for cartoons, anime, superheroes, video games, movies, kids shows, and mascots. Read the target part, rebuild the color, and see how close your visual memory gets."
      sections={[
        { title: "Character context makes color memorable", body: "A plain blue square is easy to forget, but a character's jacket, hair, cape, or hat gives that color a story. Toon Tone uses that context to make each color match feel more playful." },
        { title: "Built around HSB sliders", body: "Hue, Saturation, and Brightness split the color decision into three understandable parts. That makes the character color game accessible even if you do not know hex codes or design terminology." },
        { title: "Wide prompt categories", body: "The question bank includes classic cartoons, anime, superheroes, movies, games, mascots, and kids-show style prompts. The goal is broad character color memory, not one franchise or one art style." },
        { title: "Independent and lightweight", body: "Toon Tone is an independent browser game. The current experience relies on text references and abstract color UI, so it can stay fast, simple, and playable on mobile or desktop." },
      ]}
      tips={[
        "Use the source title as context, but focus on the exact target part.",
        "Treat character color as three questions: family, intensity, and lightness.",
        "If a guess feels close but scores low, compare brightness before changing hue.",
        "Replay different categories to find whether cartoons, anime, or game characters are hardest for you.",
      ]}
      faq={[
        ["What is a character color game?", "It is a game where you match the color of a named character part rather than a random color swatch."],
        ["Which characters are included?", "The prompt pool covers cartoon, anime, superhero, movie, game, mascot, and kids-show inspired entries."],
        ["Do I need design experience?", "No. The sliders are simple enough for casual play but still useful for practicing color judgment."],
        ["Is Toon Tone official?", "No. Toon Tone is an independent fan-oriented color memory game using text references only in the MVP."],
      ]}
    />
  );
}
