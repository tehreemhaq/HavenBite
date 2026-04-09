import { GoogleGenAI } from "@google/genai";
import { ApiError } from "../helpers/ApiErrors.js";
import { ApiResponse } from "../helpers/ApiResponse.js";

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

const muslimMajorityCountries = [
  "pakistan",
  "saudi arabia",
  "uae",
  "united arab emirates",
  "qatar",
  "kuwait",
  "oman",
  "bahrain",
  "indonesia",
  "malaysia",
  "turkey",
  "bangladesh",
  "egypt",
  "jordan",
  "morocco",
  "tunisia",
  "algeria"
];

const SYSTEM_INSTRUCTION = `
You are an AI culinary assistant that:

1) Generates a complete cooking recipe.
2) Evaluates halal compliance of every ingredient.

Follow mainstream Sunni Islamic dietary guidelines.

----------------------------------------------------
RECIPE GENERATION RULES
----------------------------------------------------
- Generate ONE complete recipe.
- Base it on provided ingredients, serving size, and country cuisine preference.
- If cuisine is invalid or unclear, default to "International".
- Use only provided ingredients.
- You may add basic pantry items if necessary (salt, oil, water, common spices).
- Minimum 5 instruction steps.
- Adjust quantities realistically for serving size.

----------------------------------------------------
HALAL VERIFICATION RULES
----------------------------------------------------
- Pork is always haram.
- Intoxicating alcohol is always haram.
- In Muslim-majority countries, assume meat is halal unless explicitly pork or alcohol-based.
- In non-Muslim-majority countries, meat requires halal certification assumption.
- If doubtful, mark as not halal.
- If not halal, provide substitution preserving flavor and function.
- For packaged products, suggest real halal-certified brands suitable for the country.
- Do NOT invent brands.

----------------------------------------------------
STRICT OUTPUT FORMAT (JSON ONLY)
----------------------------------------------------

{
  "recipe": {
    "recipeName": "string",
    "cuisine": "string",
    "servings": number,
    "ingredients": [
      {
        "name": "string",
        "quantity": "string",
        "unit": "string"
      }
    ],
    "instructions": [
      "Step 1",
      "Step 2",
      "Step 3",
      "Step 4",
      "Step 5"
    ]
  },
  "halalVerification": {
    "overallHalal": boolean,
    "ingredients": [
      {
        "name": "string",
        "isHalal": boolean,
        "substitution": "string or null"
      }
    ]
  }
}

Rules:
- No markdown.
- No explanations.
- No commentary.
- No text outside JSON.
- overallHalal must be false if any ingredient is not halal.
`;

const generateRecipeWithHalalService = async ({ ingredients, servingSize, country }) => {

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    throw new ApiError(400, "Ingredients are required and must be an array");
  }

  if (!servingSize || servingSize < 1) {
    throw new ApiError(400, "Serving size must be greater than 0");
  }

  if (!country || typeof country !== "string") {
    throw new ApiError(400, "Country is required");
  }

  const normalizedCountry = country.trim().toLowerCase();
  const isMuslimMajority = muslimMajorityCountries.includes(normalizedCountry);

  const formattedPrompt = `
User Input:
Ingredients: ${ingredients.join(", ")}
Serving Size: ${servingSize}
Country: ${normalizedCountry}
Muslim Majority Country: ${isMuslimMajority}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { role: "system", parts: [{ text: SYSTEM_INSTRUCTION }] },
        { role: "user", parts: [{ text: formattedPrompt }] }
      ],
    });

    const rawText = response.text?.trim();

    if (!rawText) {
      throw new ApiError(502, "Empty response from AI service");
    }

    const firstBrace = rawText.indexOf("{");
    const lastBrace = rawText.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) {
      throw new ApiError(502, "AI returned invalid JSON format");
    }

    const jsonString = rawText.substring(firstBrace, lastBrace + 1);

    let parsed;

    try {
      parsed = JSON.parse(jsonString);
    } catch {
      throw new ApiError(502, "Failed to parse AI JSON response");
    }

    // Structural Validation
    if (
      !parsed.recipe ||
      !parsed.halalVerification ||
      !Array.isArray(parsed.recipe.ingredients) ||
      !Array.isArray(parsed.recipe.instructions) ||
      !Array.isArray(parsed.halalVerification.ingredients)
    ) {
      throw new ApiError(502, "AI response missing required structure");
    }

    if (parsed.recipe.instructions.length < 5) {
      throw new ApiError(502, "Recipe must contain at least 5 steps");
    }

    if (typeof parsed.halalVerification.overallHalal !== "boolean") {
      throw new ApiError(502, "Invalid halal verification format");
    }

    return new ApiResponse(
      200,
      parsed,
      "Recipe and halal verification generated successfully"
    );

  } catch (error) {

    if (error instanceof ApiError) {
      throw error;
    }

    console.error("Unified AI error:", error);

    throw new ApiError(
      500,
      "Recipe and halal generation failed",
      [],
      error.stack
    );
  }
};

export { generateRecipeWithHalalService };