import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockNutritionData } from "./RecipeMockData";
import RecipeHeader from "./RecipeHeader";
import IngredientsList from "./IngredientList";
import InstructionsList from "./Instructionslist";
import HalalSubstitutionBanner from "./HalalSubstitutionBanner";
import NutritionPanel from "./NutritionPanel";
import { useRecipeContext } from "../../context/RecipeContext";

export default function RecipeResult() {
  const { recipeResult, isLoading } = useRecipeContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !recipeResult) navigate("/", { replace: true });
  }, [recipeResult, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9F3] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-[#2D5016]">
          <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
          </svg>
          <p className="text-sm font-medium">Preparing your recipe...</p>
        </div>
      </div>
    );
  }

  if (!recipeResult) return null;

  const {
    recipeName = "Unnamed Recipe",
    cuisine = "Unknown Cuisine",
    servings = "-",
  } = recipeResult;

  return (
    <div className="min-h-screen bg-[#FAF9F3]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <RecipeHeader  />

        <div className="mb-8">
          <HalalSubstitutionBanner />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-8">
            <IngredientsList />
            <InstructionsList />
          </div>
          <div className="w-full lg:w-72 xl:w-80">
            <div className="lg:sticky lg:top-6">
              <NutritionPanel  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}