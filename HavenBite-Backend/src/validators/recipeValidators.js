import joi from 'joi'



const recipeGenerationSchema = joi.object({
  ingredients: joi.string()
    .trim()
    .min(2)
    .max(300)
    .required()
    .messages({
      "string.base": "Ingredients must be a comma-separated string",
      "string.empty": "Ingredients field cannot be empty",
      "string.min": "Ingredients must contain at least one item",
      "string.max": "Too many characters in ingredients list",
      "any.required": "Ingredients are required"
    })
    .custom((value, helpers) => {
      const cleanedArray = value
        .split(",")
        .map(item => item.trim().toLowerCase())
        .filter(Boolean);

      if (cleanedArray.length === 0) {
        return helpers.message("Please provide at least one valid ingredient");
      }

      if (cleanedArray.length > 15) {
        return helpers.message("You can provide maximum 15 ingredients");
      }

      return cleanedArray;
    }, "Ingredients normalization"), 

  servingSize: joi.number() 
    .integer()
    .min(1)
    .max(20)
    .required()
    .messages({
      "number.base": "Serving size must be a number",
      "number.integer": "Serving size must be a whole number",
      "number.min": "Serving size must be at least 1",
      "number.max": "Serving size cannot exceed 20",
      "any.required": "Serving size is required"
    }),

  country: joi.string()
  .trim()
  .lowercase()
  .min(2)
  .max(50)
  .pattern(/^[a-zA-Z\s]+$/)
  .required()
  .messages({
    "string.base": "Cuisine must be a string",
    "string.empty": "Cuisine cannot be empty",
    "string.min": "Cuisine name is too short",
    "string.max": "Cuisine name is too long",
    "string.pattern.base": "Cuisine can only contain letters and spaces",
    "any.required": "Cuisine is required"
  })
});

export {recipeGenerationSchema}
