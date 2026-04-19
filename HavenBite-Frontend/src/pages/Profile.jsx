import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useRecipeContext } from "../context/RecipeContext";
import ProfileHeader from "../components/Profile/ProfileHeader";
import StatsBar from "../components/Profile/StatsBar";
import SavedRecipeGrid from "../components/Profile/SavedRecipeGrid";
import DeleteAccountButton from "../components/Profile/DeleteAccountButton";

export default function ProfilePage() {
  const { loggedInUser, isAuthLoading } = useAuthContext();
  const { getSavedRecipes, loadSavedRecipe, deleteSavedRecipe } = useRecipeContext();
  const navigate = useNavigate();

  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!isAuthLoading && !loggedInUser) {
      navigate("/", { replace: true });
    }
  }, [loggedInUser, isAuthLoading, navigate]);

  useEffect(() => {
    if (!loggedInUser) return;
    const fetchRecipes = async () => {
      setIsFetching(true);
      try {
        const data = await getSavedRecipes();
        setSavedRecipes(data?.savedRecipes ?? []);
      } catch (error) {
        console.log("failed to fetch saved recipes:", error);
        setSavedRecipes([]);
      } finally {
        setIsFetching(false);
      }
    };
    fetchRecipes();
  }, [loggedInUser]);

  if (isAuthLoading) return null;
  if (!loggedInUser) return null;

  const handleViewRecipe = (recipe) => {
    loadSavedRecipe(recipe);
    navigate("/recipe");
  };

  const handleUnsave = async (recipeId) => {
    console.log("trying to delete recipeId:", recipeId)
    setSavedRecipes((prev) => prev.filter((r) => r._id !== recipeId));
    try {
      await deleteSavedRecipe(recipeId)
    } catch (error) {
      console.log("unsave failed, rolling back:", error);
      const data = await getSavedRecipes();
      setSavedRecipes(data?.savedRecipes ?? []);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF9F3]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">

        {/* Back to home */}
        <div className="pt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#666] hover:text-[#2D5016] transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Home
          </Link>
        </div>

        <ProfileHeader />

        <div className="w-full h-px bg-[#E8E2D9] mb-8" />

        <StatsBar totalSaved={savedRecipes.length} />

        {isFetching ? (
          <div className="flex justify-center py-16">
            <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D5016" strokeWidth="2.5">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
          </div>
        ) : (
          <SavedRecipeGrid
            recipes={savedRecipes}
            onView={handleViewRecipe}
            onUnsave={handleUnsave}
          />
         
        )}
         <DeleteAccountButton />

      </div>
    </div>
  );
}