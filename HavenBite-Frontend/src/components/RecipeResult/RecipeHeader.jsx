import { useState } from "react";
import { Heart, UtensilsCrossed, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRecipeContext } from "../../context/RecipeContext";
import { useAuthContext } from "../../context/AuthContext";

export default function RecipeHeader() {
  const { recipeResult, saveRecipe } = useRecipeContext();
  const { loggedInUser } = useAuthContext();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const { recipeName, cuisine, servings } = recipeResult ?? {};

  const handleSave = async () => {
    if (!loggedInUser) {
      navigate("/login", {
        state: {
          message: "You need to login first to save recipes.",
          from: "/recipe", 
        },
      });
      return;
    }

    setIsSaving(true);
    setSaveError(null);
    try {
      await saveRecipe();
      setSaved(true);
    } catch (error) {
      if (error.response?.status === 409) {
        setSaveError("Recipe already saved.");
      } else {
        setSaveError("Could not save recipe. Try again.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-center gap-5 mb-8">
      {/* AI badge */}
      <div className="flex items-center gap-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2D5016"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 2L4.09 12.97A1 1 0 0 0 5 14h7l-1 8 8.91-10.97A1 1 0 0 0 19 10h-7l1-8z" />
        </svg>
        <span className="text-xs font-bold tracking-widest uppercase text-[#2D5016]">
          AI-Optimized Recipe
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] leading-tight max-w-2xl">
        {recipeName}
      </h1>

      {/* Cuisine + Serving tags */}
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <span className="inline-flex items-center gap-2 bg-[#2D5016] text-white text-xs font-semibold px-4 py-1.5 rounded-full">
          <UtensilsCrossed size={13} strokeWidth={2} />
          {cuisine}
        </span>
        <span className="inline-flex items-center gap-2 bg-[#E8F0E0] text-[#2D5016] text-xs font-semibold px-4 py-1.5 rounded-full border border-[#c5d9b0]">
          <Users size={13} strokeWidth={2} />
          Serves {servings}
        </span>
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={isSaving || saved}
        className={`inline-flex items-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-full shadow-sm border transition-all duration-200
          ${
            saved
              ? "bg-[#2D5016] border-[#2D5016] text-white cursor-default"
              : "bg-white border-[#E8E2D9] text-[#333] hover:border-[#2D5016] hover:text-[#2D5016]"
          }`}
      >
        <Heart size={15} strokeWidth={2} fill={saved ? "white" : "none"} />
        {isSaving ? "Saving..." : saved ? "Saved!" : "Save Recipe"}
      </button>

      {/* Error feedback */}
      {saveError && <p className="text-xs text-[#C8572B] -mt-2">{saveError}</p>}
    </div>
  );
}
