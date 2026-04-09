import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import IngredientsInput from "./IngredientsInput";
import RecipeOptions from "./RecipeOptions";
import { useRecipeContext } from "../../context/RecipeContext";

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState("");
  const [servingSize, setServingSize] = useState("2");
  const [cuisineStyle, setCuisineStyle] = useState("Any Style");
  const [error, setError] = useState(null)

  const { generateRecipe, isLoading } = useRecipeContext()
  const navigate = useNavigate();

  const GenerateRecipeHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    // Client side validation
    if (!ingredients.trim()) {
      setError("Please enter at least one ingredient before generating.")
      return;
    }

    setError(null) // clear any previous error before new attempt
    const recipeInput = { ingredients, servingSize, country: cuisineStyle }

    try {
      await generateRecipe(recipeInput)
      navigate("/recipe")
    } catch (err) {
      const responseData = err.response?.data
      setError(responseData?.message || "Something went wrong generating your recipe. Please try again.")
    }
  };

  return (
    <section id="generator" className="w-full bg-[#FAF9F3] py-10 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-md max-w-3xl mx-auto px-6 sm:px-8 py-6">

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
            <div>
              <h2 className="text-2xl font-bold text-[#1a1a1a]">Recipe Generator</h2>
              <p className="text-sm text-[#888] mt-1">
                List your available ingredients for a curated Halal menu.
              </p>
            </div>
          </div>

          <form onSubmit={GenerateRecipeHandler} className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-6 items-stretch">
              <div className="md:w-1/2 flex flex-col">
                <IngredientsInput
                  value={ingredients}
                  onChange={(val) => {
                    setIngredients(val)
                    if (error) setError(null) // clear error as user types
                  }}
                />
              </div>
              <div className="md:w-1/2">
                <RecipeOptions
                  servingSize={servingSize}
                  cuisineStyle={cuisineStyle}
                  onServingChange={setServingSize}
                  onCuisineChange={setCuisineStyle}
                />
              </div>
            </div>

            {/* Error banner */}
            {error && (
              <div className="flex items-start gap-2.5 bg-[#FFF8F5] border border-[#C8572B]/30 rounded-xl px-4 py-3">
                <AlertCircle size={15} strokeWidth={2} color="#C8572B" className="shrink-0 mt-0.5" />
                <p className="text-sm text-[#C8572B] font-medium">{error}</p>
              </div>
            )}

            <div className="flex flex-col items-center gap-2 pt-1">
              <button
                type="submit"
                disabled={isLoading}
                className={`inline-flex items-center gap-2 text-white text-sm font-semibold px-8 py-3 rounded-md transition-colors duration-200
                  ${isLoading
                    ? "bg-[#6a8f52] cursor-not-allowed opacity-75"
                    : "bg-[#2D5016] hover:bg-[#3a6b1e] cursor-pointer"
                  }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13 2L4.09 12.97A1 1 0 0 0 5 14h7l-1 8 8.91-10.97A1 1 0 0 0 19 10h-7l1-8z"/>
                    </svg>
                    Generate Halal Recipe
                  </>
                )}
              </button>
              <p className="text-[11px] text-[#bbb] italic">
                Recipe generated and Halal-verified using AI
              </p>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}

export default RecipeGenerator