import { useState } from "react";
import { UtensilsCrossed, Users, Bookmark } from "lucide-react";
import UnsaveConfirmModal from "./UnSavedConfirmModal";

export default function SavedRecipeCard({ recipe, onView, onUnsave }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUnsaveConfirm = async () => {
    setIsDeleting(true);
    try {
      await onUnsave(recipe._id);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-200">

        {/* Top row — consistent food icon + bookmark */}
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-xl bg-[#E8F0E0] border border-[#c5d9b0] flex items-center justify-center">
            <UtensilsCrossed size={18} strokeWidth={1.8} color="#2D5016" />
          </div>

          {/* Filled bookmark — click to unsave */}
          <button
            onClick={() => setShowConfirm(true)}
            className="text-[#2D5016] hover:text-[#C8572B] transition-colors duration-200"
            title="Unsave recipe"
          >
            <Bookmark size={18} strokeWidth={2} fill="currentColor" />
          </button>
        </div>

        {/* Recipe name */}
        <h3 className="text-sm font-bold text-[#1a1a1a] leading-snug" style={{ fontFamily: "'Georgia', serif" }}>
          {recipe.recipeName}
        </h3>

        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#2D5016] bg-[#E8F0E0] border border-[#c5d9b0] px-2.5 py-1 rounded-full">
            <UtensilsCrossed size={10} strokeWidth={2} />
            {recipe.cuisine}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#555] bg-[#F5F2EC] border border-[#E8E2D9] px-2.5 py-1 rounded-full">
            <Users size={10} strokeWidth={2} />
            {recipe.servings} Servings
          </span>
        </div>

        {/* View Recipe btn */}
        <button
          onClick={() => onView(recipe)}
          className="w-full bg-[#F5F2EC] hover:bg-[#E8F0E0] border border-[#E8E2D9] hover:border-[#c5d9b0] text-[#2D5016] text-xs font-bold py-2.5 rounded-xl transition-colors duration-200"
        >
          View Recipe
        </button>

      </div>

      {showConfirm && (
        <UnsaveConfirmModal
          recipeName={recipe.recipeName}
          onConfirm={handleUnsaveConfirm}
          onCancel={() => setShowConfirm(false)}
          isDeleting={isDeleting}
        />
      )}
    </>
  );
}