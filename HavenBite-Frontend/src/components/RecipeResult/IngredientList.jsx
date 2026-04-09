import { ShoppingBasket, ArrowRightLeft } from "lucide-react";
import { useRecipeContext } from "../../context/RecipeContext";

function IngredientCard({ ingredient, substitution }) {
  const { name, quantity, unit } = ingredient;
  const isSwapped = !!substitution;

  return (
    <div className={`relative flex items-start gap-3 rounded-xl px-4 py-3 border transition-colors
      ${isSwapped ? "bg-[#FFF8F5] border-[#C8572B]/30" : "bg-white border-[#E8E2D9]"}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5
        ${isSwapped ? "bg-[#C8572B]" : "bg-[#2D5016]"}`}
      />
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className={`text-sm font-semibold capitalize
            ${isSwapped ? "text-[#C8572B] line-through" : "text-[#1a1a1a]"}`}
          >
            {name}
          </p>
          {isSwapped && (
            <span className="inline-flex items-center gap-1 bg-[#2D5016] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
              <ArrowRightLeft size={9} strokeWidth={2.5} />
              Swapped
            </span>
          )}
        </div>
        <p className="text-xs text-[#999]">{quantity} {unit}</p>
        {isSwapped && (
          <p className="text-xs text-[#2D5016] font-medium mt-0.5 leading-relaxed">
            ↳ {substitution}
          </p>
        )}
      </div>
    </div>
  );
}

export default function IngredientsList() {
  const { recipeResult, halalVerificationResult } = useRecipeContext();

  const ingredients = recipeResult?.ingredients ?? [];
  const nonHalalItems = halalVerificationResult?.ingredients?.filter(i => !i.isHalal) ?? [];

  const substitutionMap = Object.fromEntries(
    nonHalalItems.map(item => [item.name.toLowerCase(), item.substitution])
  );

  if (ingredients.length === 0) return <p className="text-sm text-[#888]">No ingredients found.</p>;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <ShoppingBasket size={18} strokeWidth={2} color="#2D5016" />
        <h2 className="text-lg font-bold text-[#1a1a1a]">Ingredients</h2>
        {nonHalalItems.length > 0 && (
          <span className="text-xs text-[#C8572B] font-medium bg-[#FFF8F5] border border-[#C8572B]/30 px-2 py-0.5 rounded-full">
            {nonHalalItems.length} substitution{nonHalalItems.length > 1 ? "s" : ""}
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ingredients.map((ingredient, index) => (
          <IngredientCard
            key={index}
            ingredient={ingredient}
            substitution={substitutionMap[ingredient.name.toLowerCase()]}
          />
        ))}
      </div>
    </div>
  );
}