// ─── 1. Recipe Response ───────────────────────────────────────────────────────
// Shape: what your backend AI service returns
export const mockRecipeResponse = {
  recipeName: "Spiced Chicken Rice Bowl",
  cuisine: "Indian",
  servings: 2,
  ingredients: [
    { name: "chicken", quantity: "300", unit: "grams" },
    { name: "rice", quantity: "1", unit: "cup" },
    { name: "tomato", quantity: "2", unit: "medium" },
    { name: "onion", quantity: "1", unit: "medium" },
    { name: "oil", quantity: "2", unit: "tablespoons" },
    { name: "salt", quantity: "1", unit: "teaspoon" },
    { name: "red chili powder", quantity: "1", unit: "teaspoon" },
  ],
  instructions: [
    "Wash and soak the rice for 20 minutes.",
    "Heat oil in a pan and sauté chopped onions until golden.",
    "Add chicken pieces and cook until lightly browned.",
    "Add chopped tomatoes, salt, and spices. Cook until softened.",
    "Add soaked rice and 2 cups of water. Cover and cook until rice is tender.",
    "Fluff the rice and serve hot.",
  ],
};

// ─── 2. Halal Verification Response ──────────────────────────────────────────
// Shape: what your halal verification AI service returns per ingredient
export const mockHalalVerification = {
  overallHalal: true,
  ingredients: [
    { name: "chicken", isHalal: true, substitution: null },
    { name: "rice", isHalal: true, substitution: null },
    { name: "tomato", isHalal: false, substitution: "halal-tomato" },
    { name: "onion", isHalal: true, substitution: null },
    { name: "oil", isHalal: false, substitution: "Halal-certified vegetable oil" },
    { name: "salt", isHalal: true, substitution: null },
    { name: "red chili powder", isHalal: true, substitution: null },
  ],
};

// ─── 3. Nutrition API Response ────────────────────────────────────────────────
// Shape: what your external nutrition API returns for the recipe
export const mockNutritionData = {
  calories: 480,
  protein: 38,
  carbs: 52,
  fat: 14,
  fiber: 3,
  sodium: 620,
};