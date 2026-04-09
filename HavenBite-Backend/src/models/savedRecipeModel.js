import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  quantity: { type: String, required: true },
  unit:     { type: String, required: true, trim: true },
}, { _id: false })

const halalIngredientSchema = new mongoose.Schema({
  name:         { type: String, required: true, trim: true },
  isHalal:      { type: Boolean, required: true },
  substitution: { type: String, default: null },
}, { _id: false })

const nutritionValueSchema = new mongoose.Schema({
  name:               { type: String },
  amount:             { type: Number },
  unit:               { type: String },
  percentOfDailyNeeds:{ type: Number },
}, { _id: false })

const nutritionSchema = new mongoose.Schema({
  calories:       { type: nutritionValueSchema },
  protein:        { type: nutritionValueSchema },
  carbs:          { type: nutritionValueSchema },
  fat:            { type: nutritionValueSchema },
  weightPerServing: {
    amount: { type: Number },
    unit:   { type: String },
  },
  breakdown: {
    percentProtein: { type: Number },
    percentFat:     { type: Number },
    percentCarbs:   { type: Number },
  },
}, { _id: false })

const savedRecipeSchema = new mongoose.Schema(
  {
    // Owner
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,          // fast lookup of all recipes by user
    },

    // Core recipe
    recipeName: {
      type: String,
      required: true,
      trim: true,
    },
    cuisine: {
      type: String,
      trim: true,
      default: "Unknown",
    },
    servings: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [ingredientSchema],
      required: true,
    },
    instructions: {
      type: [String],
      required: true,
    },

    // Halal verification snapshot
    halalVerification: {
      isFullyHalal: { type: Boolean, required: true },
      ingredients:  { type: [halalIngredientSchema], default: [] },
    },

    // Nutrition snapshot — optional since external API can fail
    nutrition: {
      type: nutritionSchema,
      default: null,
    },
  },
  {
    timestamps: true,      // createdAt = savedAt, updatedAt available too
  }
)

// Prevent saving the exact same recipe twice for the same user
savedRecipeSchema.index({ user: 1, recipeName: 1 }, { unique: true })

const savedRecipeModel = mongoose.model("SavedRecipe", savedRecipeSchema)

export { savedRecipeModel }