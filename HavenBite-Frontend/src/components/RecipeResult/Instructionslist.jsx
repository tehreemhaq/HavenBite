import { BookText } from "lucide-react";
import { useRecipeContext } from "../../context/RecipeContext";

// Splits instruction text and highlights any swapped ingredient names found in it
function HighlightedText({ text, swappedNames }) {
  if (swappedNames.length === 0) return <span>{text}</span>;

  // Build a regex that matches any swapped ingredient name (case-insensitive)
  const pattern = new RegExp(`(${swappedNames.map(n => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join("|")})`, "gi");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) =>
        swappedNames.some(n => n.toLowerCase() === part.toLowerCase())
          ? (
            <span
              key={i}
              className="text-[#C8572B] font-semibold bg-[#FFF8F5] px-1 py-0.5 rounded capitalize"
            >
              {part}
            </span>
          )
          : <span key={i}>{part}</span>
      )}
    </>
  );
}

function InstructionStep({ step, text, swappedNames }) {
  return (
    <div className="flex items-start gap-4">
      <span className="w-8 h-8 rounded-full bg-[#2D5016] text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
        {step}
      </span>
      <p className="text-sm text-[#555] leading-relaxed pt-1">
        <HighlightedText text={text} swappedNames={swappedNames} />
      </p>
    </div>
  );
}

export default function InstructionsList() {
  const { recipeResult, halalVerificationResult } = useRecipeContext();

  const instructions = recipeResult?.instructions ?? [];
  const nonHalalItems = halalVerificationResult?.ingredients?.filter(i => !i.isHalal) ?? [];

  // Just the names — used for text matching
  const swappedNames = nonHalalItems.map(item => item.name);

  if (instructions.length === 0) return <p className="text-sm text-[#888]">No instructions found.</p>;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <BookText size={18} strokeWidth={2} color="#2D5016" />
        <h2 className="text-lg font-bold text-[#1a1a1a]">Instructions</h2>
      </div>
      <div className="flex flex-col gap-6">
        {instructions.map((text, index) => (
          <InstructionStep
            key={index}
            step={index + 1}
            text={text}
            swappedNames={swappedNames}
          />
        ))}
      </div>
    </div>
  );
}