import { ShieldCheck, ShieldX } from "lucide-react";
import { useRecipeContext } from "../../context/RecipeContext";

export default function HalalSubstitutionBanner() {
const { halalVerificationResult } = useRecipeContext();

  // Edge case: malformed or missing ingredients array
  const ingredients = halalVerificationResult?.ingredients ?? [];
  const nonHalalItems = ingredients.filter((i) => !i.isHalal);
  const isAllHalal = nonHalalItems.length === 0;

  return (
    <div className="flex items-start gap-4 bg-white border border-[#E8E2D9] rounded-xl px-6 py-5 shadow-sm">

      <div className="w-8 h-8 bg-[#2D5016] rounded-md flex items-center justify-center shrink-0 mt-0.5">
        {isAllHalal
          ? <ShieldCheck size={15} strokeWidth={2.5} color="white" />
          : <ShieldX size={15} strokeWidth={2.5} color="white" />
        }
      </div>

      <div className="flex flex-col gap-2 w-full">
        <p className="text-sm font-bold text-[#1a1a1a]">
          {isAllHalal
            ? "All Ingredients Halal Verified"
            : `Halal Substitution${nonHalalItems.length > 1 ? "s" : ""} Applied`
          }
        </p>

        {isAllHalal ? (
          <p className="text-sm text-[#666] leading-relaxed">
            Every ingredient in this recipe is Halal-compliant — no substitutions needed. Cook with confidence!
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Intro line — written once, not repeated per item */}
            <p className="text-sm text-[#666] leading-relaxed">
              We've made {nonHalalItems.length} Halal substitution{nonHalalItems.length > 1 ? "s" : ""} to ensure 100% compliance while maintaining authentic flavor profiles.
            </p>

            {/* One clean row per swapped ingredient */}
            {nonHalalItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 bg-[#FAF9F3] border border-[#E8E2D9] rounded-lg px-4 py-3 text-sm"
              >
                {/* Original ingredient — struck through */}
                <span className="text-[#C8572B] font-semibold line-through shrink-0 capitalize">
                  {item.name}
                </span>

                {/* Arrow separator */}
                <span className="text-[#bbb] hidden sm:inline">→</span>

                {/* Substitution — displayed as-is from AI, no wrapping sentence */}
                <span className="text-[#1a1a1a] font-medium leading-relaxed">
                  {item.substitution}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}