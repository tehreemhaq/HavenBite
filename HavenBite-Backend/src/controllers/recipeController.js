import { ApiResponse } from "../helpers/ApiResponse.js";
import { ApiError } from "../helpers/ApiErrors.js";
import { asyncWrapper } from "../helpers/asyncWrapper.js";
import { generateRecipeWithHalalService } from "../services/aiRecipeGenerationService.js";
// import { halalVerificationService } from "../services/aiHalalVerificationService.js";
import { mockUnifiedRecipeResponse } from "../mockdata/recipeMockData.js";
import { nutritionMockData } from "../mockdata/nutritionMockData.js";
import { nutritionService } from "../services/nutritionService.js";
import { savedRecipeModel } from "../models/savedRecipeModel.js";


const generateRecipe = asyncWrapper(async (req, res) => {
  const { ingredients, servingSize, country } = req.body;

  const recipeInput = {
    ingredients,
    servingSize,
    country,
  };
  console.log("recipe after vaidation :", recipeInput);

  if (process.env.USE_AI === "true") {
    const response = await generateRecipeWithHalalService(recipeInput);
    console.log("response from ai service : ", response);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { recipeResponse: response },
          "recipe generated successfully",
        ),
      );
  } else {
    console.log("mockUnifiedRecipeResponse", mockUnifiedRecipeResponse);
    return res.status(200).json(mockUnifiedRecipeResponse);
  }
});

// get ingredients , serving size , recipe name from req body (may add validation middleware before that)
// call the nutritionInfo service (pass ingredients , serving sixe and recipe name as arguments)
// get the return from the service and send the response
// edge cases handling
const fetchNutritionInfo = asyncWrapper(async (req, res) => {
  const { recipeName, servings, ingredients } = req.body;
  const ingredientsList = {
    recipeName,
    servings,
    ingredients,
  };

  console.log("ingredient list", ingredientsList);
  if (process.env.USE_SPOONACULAR_API === "true") {
    const response = await nutritionService(ingredientsList);
    console.log("response from nutrtional info", response);
    res.status(200).json(new ApiResponse(200 ,response, "nutritional info"))

  }else{
   res.status(200).json(new ApiResponse(200 ,nutritionMockData, "nutritional info"))
  }

 
});

const saveRecipe = asyncWrapper(async (req, res) => {
  const {
    recipeName,
    cuisine,
    servings,
    ingredients,
    instructions,
    halalVerification,
    nutrition,
  } = req.body

  // Edge case: duplicate — compound index will throw code 11000
  const existingRecipe = await savedRecipeModel.findOne({
    user: req.user._id,
    recipeName,
  })
  if (existingRecipe) {
    throw new ApiError(409, "Recipe already saved")
  }

  const savedRecipe = await savedRecipeModel.create({
    user: req.user._id,
    recipeName,
    cuisine,
    servings,
    ingredients,
    instructions,
    halalVerification,        // shape matches model exactly — no remapping
    nutrition: nutrition ?? null,
  })

  return res
    .status(201)
    .json(new ApiResponse(201, { savedRecipe }, "Recipe saved successfully"))
})
 



const getSavedRecipe = asyncWrapper(async (req, res) => {
  const savedRecipes = await savedRecipeModel
    .find({ user: req.user._id })
    .sort({ createdAt: -1 })  // most recently saved first
    .select("-__v")            // remove internal mongoose field

  if (!savedRecipes.length) {
    return res
      .status(200)
      .json(new ApiResponse(200, { savedRecipes: [] }, "No saved recipes found"))
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { savedRecipes }, "Saved recipes fetched successfully"))
})


const deleteSavedRecipe = asyncWrapper(async (req, res) => {
  const { recipeId } = req.params
  console.log("recipeId from params:", recipeId)      
  console.log("user id:", req.user._id)

  const recipe = await savedRecipeModel.findOne({
    _id: recipeId,
    user: req.user._id  // ensures user can only delete their own recipes
  })

  console.log("found recipe:", recipe)

  if (!recipe) {
    throw new ApiError(404, "Recipe not found")
  }

  await savedRecipeModel.findByIdAndDelete(recipeId)

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Recipe removed successfully"))
})


export { generateRecipe, fetchNutritionInfo , saveRecipe, getSavedRecipe , deleteSavedRecipe};
