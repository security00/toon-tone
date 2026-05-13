import type { Metadata } from "next";
import SeoGamePage from "@/components/SeoGamePage";

export const metadata: Metadata = {
  title: "Cartoon Color Guessing Game | Match Character Colors Online",
  description: "Play a cartoon color guessing game online. Remember character colors, adjust HSB sliders, reveal the answer, and compare your score.",
  alternates: { canonical: "/cartoon-color-guessing-game/" },
};

export default function Page() {
  return (
    <SeoGamePage
      title="Cartoon Color Guessing Game"
      canonical="/cartoon-color-guessing-game/"
      intro="This cartoon color guessing game tests how well you remember iconic visual details. Instead of choosing from multiple choice answers, you rebuild the target color with Hue, Saturation, and Brightness controls."
      sections={[
        { title: "A memory test, not a quiz list", body: "Many cartoon quizzes ask you to identify a character from a picture or palette. Toon Tone focuses on color memory itself: can you recreate the exact tone of a named character part after reading the prompt?" },
        { title: "Why cartoon colors are tricky", body: "Cartoon colors look simple at first, but small changes in saturation or brightness can make a familiar shirt, hat, or hair color feel wrong. The game rewards careful visual judgment, not just knowing the character." },
        { title: "Fast browser play", body: "The challenge runs directly in the browser and is designed for short sessions. You can complete the daily five-round run, share a result, and come back for more practice later." },
        { title: "Useful for casual players and artists", body: "Cartoon fans can enjoy the trivia-like memory loop, while artists and designers can use the game as a quick warm-up for hue, saturation, and brightness awareness." },
      ]}
      tips={[
        "Think of the character part first, then the color family.",
        "Do not over-saturate every cartoon color; many remembered tones are softer than expected.",
        "Compare your miss after each reveal so the next round becomes easier.",
        "Play on the same screen when comparing scores, because displays can shift color perception.",
      ]}
      faq={[
        ["What is a cartoon color guessing game?", "It is a browser game where you recreate the color of a cartoon-inspired character part from memory."],
        ["Do I need to know hex colors?", "No. You use HSB sliders instead of typing hex codes."],
        ["Is the game only for cartoons?", "The question bank also includes anime, superhero, movie, game, and mascot-inspired prompts."],
        ["Can I share my result?", "Yes. Finish the daily challenge and use the share or PNG score card option."],
      ]}
    />
  );
}
