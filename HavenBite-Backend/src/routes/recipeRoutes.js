import express from 'express'
const router = express.Router();
import { generateRecipe , fetchNutritionInfo ,saveRecipe , getSavedRecipe ,deleteSavedRecipe } from '../controllers/recipeController.js';
import { recipeGenerationSchema } from '../validators/recipeValidators.js';
import { validate } from '../middlewares/validationMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';






router.route('/generate-recipe').post(validate(recipeGenerationSchema , 'body') , generateRecipe)
router.route('/fetch-nutritionInfo').post(fetchNutritionInfo)
router.route('/save-recipe').post(authMiddleware, saveRecipe)
router.route('/saved-recipe').get(authMiddleware , getSavedRecipe)
router.route('/saved-recipe/:recipeId').delete(authMiddleware, deleteSavedRecipe)






export default router