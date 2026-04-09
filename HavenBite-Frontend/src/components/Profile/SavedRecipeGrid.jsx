import { BookMarked, Bookmark } from "lucide-react";
import SavedRecipeCard from "./SavedRecipeCard";

export default function SavedRecipeGrid({ recipes, onView, onUnsave }) {
  return (
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Bookmark size={16} strokeWidth={2.5} color="#2D5016" fill="#2D5016" />
          <h2 className="text-base font-bold text-[#1a1a1a]">Your Saved Recipes</h2>
        </div>
        {recipes.length > 4 && (
          <button className="text-xs text-[#2D5016] font-semibold hover:underline transition">
            View All
          </button>
        )}
      </div>

      {/* Empty state */}
      {recipes.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <div className="w-12 h-12 rounded-full bg-[#F5F2EC] border border-[#E8E2D9] flex items-center justify-center">
            <BookMarked size={20} strokeWidth={1.8} color="#bbb" />
          </div>
          <p className="text-sm font-semibold text-[#1a1a1a]">No saved recipes yet</p>
          <p className="text-xs text-[#999]">Generate a recipe and save it to see it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recipes.map((recipe) => (
            <SavedRecipeCard
              key={recipe._id}
              recipe={recipe}
              onView={onView}
              onUnsave={onUnsave}
            />
          ))}
        </div>
      )}
    </div>
  );
}