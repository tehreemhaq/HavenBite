import axios from "axios";

const nutritionService = async (ingredientsInput) => {
  try {
    const apiKey = process.env.SPOONACULAR_API_KEY;
    // Spoonacular Analyze Recipe endpoint
    // Correct Format
const url = `https://api.spoonacular.com/recipes/analyze?apiKey=${process.env.SPOONACULAR_API_KEY}&includeNutrition=true`;
// 2. Map the array of objects into the string format Spoonacular expects
    const formattedIngredients = ingredientsInput.ingredients.map(ing => 
      `${ing.quantity} ${ing.unit} ${ing.name}`
    );

    // 3. Construct the payload exactly as the API requires
    const payload = {
      title: ingredientsInput.recipeName,
      servings: ingredientsInput.servings,
      ingredients: formattedIngredients // This is now ['300 grams chicken', ...]
    };

    const response = await axios.post(url, payload);
  const allNutrients = response.data.nutrition.nutrients;

    // Extract only the important stuff
    const simplifiedNutrition = {
      calories: allNutrients.find(n => n.name === 'Calories'),
      fat: allNutrients.find(n => n.name === 'Fat'),
      carbs: allNutrients.find(n => n.name === 'Carbohydrates'),
      protein: allNutrients.find(n => n.name === 'Protein'),
      // Add the caloric breakdown (the % ratio of fat/carbs/protein)
      breakdown: response.data.nutrition.caloricBreakdown,
      weightPerServing: response.data.nutrition.weightPerServing
    };

    return simplifiedNutrition;
    
  } catch (error) {
    console.error("Spoonacular Error:", error.response?.data || error.message);
  }
};

// nutrition.controller.js

export { nutritionService };
