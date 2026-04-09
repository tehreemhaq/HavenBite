export const mockUnifiedRecipeResponse = {
  statusCode: 200,
  success: true,
  data: {
    recipeResponse: {
      statusCode: 200,
      success: true,
      data: {
        recipe: {
          recipeName: "Japanese-Style Lemon Tomato Chicken",
          cuisine: "Japanese",
          servings: 2,
          ingredients: [
            { name: "Chicken Thighs", quantity: "300", unit: "grams" },
            { name: "Tomato", quantity: "2", unit: "medium" },
            { name: "Lemon", quantity: "1/2", unit: "piece" },
            { name: "Vegetable Oil", quantity: "1", unit: "tablespoon" },
            { name: "Salt", quantity: "1/2", unit: "teaspoon" },
            { name: "Water", quantity: "2", unit: "tablespoons" }
          ],
          instructions: [
            "Cut the chicken thighs into bite-sized pieces and lightly season with a pinch of salt.",
            "Dice the tomatoes into 1-inch chunks and squeeze the juice from the half lemon, removing any seeds.",
            "Heat the vegetable oil in a frying pan over medium-high heat and sear the chicken until golden brown and cooked through.",
            "Add the diced tomatoes and water to the pan, then cover with a lid and simmer for 3-4 minutes until the tomatoes soften into a light sauce.",
            "Remove the lid, stir in the lemon juice and the remaining salt, then simmer for one more minute before serving."
          ]
        },
        halalVerification: {
          overallHalal: false,
          ingredients: [
            {
              name: "Chicken Thighs",
              isHalal: false,
              substitution: "Purchase Halal-certified chicken from specialty providers in Japan such as Baticom or Mainichi Halal."
            },
            { name: "Tomato", isHalal: true, substitution: null },
            { name: "Lemon", isHalal: true, substitution: null },
            { name: "Vegetable Oil", isHalal: true, substitution: null },
            { name: "Salt", isHalal: true, substitution: null },
            { name: "Water", isHalal: true, substitution: null }
          ]
        }
      },
      message: "Recipe and halal verification generated successfully"
    }
  },
  message: "recipe generated successfully"
};