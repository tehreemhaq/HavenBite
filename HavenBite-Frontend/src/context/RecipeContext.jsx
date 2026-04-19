import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export const RecipeContext = createContext();
export const useRecipeContext = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }) => {
  const [recipeResult, setRecipeResult] = useState();
  const [halalVerificationResult, setHalalVerificationResult] = useState();
  const [nutritionResult, setNutritionResult] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isNutritionLoading, setIsNutritionLoading] = useState(false);
  const [nutritionError, setNutritionError] = useState(false);
  const [isFromSaved, setIsFromSaved] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!recipeResult || !halalVerificationResult) return;
    if (isFromSaved) {
      setIsFromSaved(false);
      return;
    }

    const fetchNutrition = async () => {
      setIsNutritionLoading(true);
      setNutritionError(false);
      try {
        const finalIngredients = getSwappedIngredients(
          recipeResult.ingredients,
          halalVerificationResult,
        );

        const nutritionPayload = {
          recipeName: recipeResult.recipeName,
          servings: recipeResult.servings,
          ingredients: finalIngredients,
        };

        const nutritionResponse = await axios.post(
          "/recipe/fetch-nutritionInfo",
          nutritionPayload,
        );
        setNutritionResult(nutritionResponse.data.data);
      } catch (error) {
        console.log("nutrition fetch failed:", error.response?.data);
        setNutritionResult(null);
        setNutritionError(true);
      } finally {
        setIsNutritionLoading(false);
      }
    };

    fetchNutrition();
  }, [recipeResult]);

  const getSwappedIngredients = (ingredients, halalVerification) => {
    const nonHalalItems =
      halalVerification?.ingredients?.filter((i) => !i.isHalal) ?? [];

    const substitutionMap = Object.fromEntries(
      nonHalalItems.map((item) => [item.name.toLowerCase(), item.substitution]),
    );

    return ingredients.map((ingredient) => {
      const substitute = substitutionMap[ingredient.name.toLowerCase()];
      return substitute ? { ...ingredient, name: substitute } : ingredient;
    });
  };

  const generateRecipe = async (recipeInput) => {
    setIsLoading(true);
    setRecipeResult(undefined);
    setHalalVerificationResult(undefined);
    setNutritionResult(undefined);
    setNutritionError(false);
    try {
      const response = await axios.post("/recipe/generate-recipe", recipeInput);
      const recipe = response.data.data.recipeResponse.data.recipe;
      const halalVerification = response.data.data.recipeResponse.data.halalVerification;

      setRecipeResult(recipe);
      setHalalVerificationResult(halalVerification);
    } catch (error) {
      const status = error?.response?.status

      // No status means the server is completely unreachable (network down)
      // 5xx means server or AI service failed
      if (!status || status >= 500) {
        const isAIError = error?.response?.data?.isAIError ?? false
        navigate("/error", { state: { reason: isAIError ? "ai" : "server" } })
        return
      }

      // 4xx errors — re-throw so the calling component can show them in the UI
      console.log("error in recipe generation:", error.response?.data);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loadSavedRecipe = (savedRecipe) => {
    setIsFromSaved(true); // must be set BEFORE state updates to block useEffect

    setRecipeResult({
      recipeName:   savedRecipe.recipeName,
      cuisine:      savedRecipe.cuisine,
      servings:     savedRecipe.servings,
      ingredients:  savedRecipe.ingredients,
      instructions: savedRecipe.instructions,
    });

    setHalalVerificationResult({
      isFullyHalal: savedRecipe.halalVerification.isFullyHalal,
      ingredients:  savedRecipe.halalVerification.ingredients,
    });

    // Use saved nutrition snapshot — may be null if API failed at save time
    setNutritionResult(savedRecipe.nutrition ?? null);
  };

  const saveRecipe = async () => {
    try {
      const payload = {
        recipeName: recipeResult.recipeName,
        cuisine: recipeResult.cuisine,
        servings: recipeResult.servings,
        ingredients: recipeResult.ingredients,
        instructions: recipeResult.instructions,
        halalVerification: {
          isFullyHalal:
            halalVerificationResult?.ingredients?.every((i) => i.isHalal) ?? true,
          ingredients: halalVerificationResult?.ingredients ?? [],
        },
        nutrition: nutritionResult ?? null,
      };

      const response = await axios.post("/recipe/save-recipe", payload);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("save recipe error:", error.response?.data);
      throw error;
    }
  };

  const getSavedRecipes = async () => {
    try {
      const response = await axios.get("/recipe/saved-recipe");
      console.log("saved recipes raw:", response.data.data.savedRecipes);
      return response.data.data;
    } catch (error) {
      console.log("get saved recipes error:", error.response?.data);
      throw error;
    }
  };

  const deleteSavedRecipe = async (recipeId) => {
    try {
      const response = await axios.delete(`/recipe/saved-recipe/${recipeId}`);
      return response.data;
    } catch (error) {
      console.log("delete saved recipe error:", error.response?.data);
      throw error; // re-throw so ProfilePage can rollback on failure
    }
  };

  const value = {
    recipeResult,
    halalVerificationResult,
    nutritionResult,
    isLoading,
    isNutritionLoading,
    nutritionError,
    generateRecipe,
    saveRecipe,
    getSavedRecipes,
    loadSavedRecipe,
    deleteSavedRecipe,
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
};