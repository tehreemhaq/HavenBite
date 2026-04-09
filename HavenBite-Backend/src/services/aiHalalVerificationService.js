import { GoogleGenAI } from "@google/genai";
import { ApiError } from "../helpers/ApiErrors.js";
import { ApiResponse } from "../helpers/ApiResponse.js";

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

// Maintain this list yourself. Do NOT let AI guess.
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

const HALAL_SYSTEM_INSTRUCTION = `
You are an AI assistant that evaluates food ingredients for halal compliance
according to mainstream Sunni Islamic dietary guidelines.

Scope:
- Follow mainstream Sunni jurisprudence.
- Assume conventional commercial food production.
- Pork and intoxicating alcohol are always haram.
- If alcohol is present in intoxicating quantity, it is haram.
- If slaughter method matters (e.g., chicken, beef, lamb), treat it as halal only if certified in non-Muslim-majority countries.
- In Muslim-majority countries, assume meat is halal unless explicitly identified as pork or alcohol-based.
- If doubtful or ambiguous, mark as not halal and provide safe substitution.

Task:
- Analyze each ingredient individually.
- Determine whether it is halal.
- If not halal, provide a substitution that preserves flavor and culinary function.
- For packaged products, suggest a real halal-certified brand suitable for the user's country.
- Do NOT invent brands.
- If no reliable brand suggestion exists, suggest a generic halal-certified alternative.

Output format (STRICT JSON ONLY):

{
  "overallHalal": boolean,
  "ingredients": [
    {
      "name": "string",
      "isHalal": boolean,
      "substitution": "string or null"
    }
  ]
}

Rules:
- Do NOT include explanations.
- Do NOT include commentary.
- Do NOT include markdown.
- Do NOT include text outside JSON.
- overallHalal must be false if any ingredient is not halal.
`;

const halalVerificationService = async ({ ingredients, country }) => {

  // Defensive validation
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    throw new ApiError(400, "Ingredients are required and must be an array");
  }

  if (!country || typeof country !== "string") {
    throw new ApiError(400, "Country is required for halal verification");
  }

  const normalizedCountry = country.trim().toLowerCase();
  const isMuslimMajority = muslimMajorityCountries.includes(normalizedCountry);

  const formattedPrompt = `
User Country: ${normalizedCountry}
Muslim Majority Country: ${isMuslimMajority}

Ingredients:
${ingredients.join(", ")}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { role: "system", parts: [{ text: HALAL_SYSTEM_INSTRUCTION }] },
        { role: "user", parts: [{ text: formattedPrompt }] }
      ],
    });

    const rawText = response.text?.trim();

    if (!rawText) {
      throw new ApiError(502, "Empty response from AI service");
    }

    // Defensive JSON extraction
    const firstBrace = rawText.indexOf("{");
    const lastBrace = rawText.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) {
      throw new ApiError(502, "AI returned invalid JSON format");
    }

    const jsonString = rawText.substring(firstBrace, lastBrace + 1);

    let parsed;

    try {
      parsed = JSON.parse(jsonString);
    } catch (err) {
      throw new ApiError(502, "Failed to parse AI JSON response");
    }

    // Structural sanity check
    if (
      typeof parsed.overallHalal !== "boolean" ||
      !Array.isArray(parsed.ingredients)
    ) {
      throw new ApiError(502, "AI response missing required halal fields");
    }

    // Extra hardening: ensure each ingredient has required shape
    for (const item of parsed.ingredients) {
      if (
        typeof item.name !== "string" ||
        typeof item.isHalal !== "boolean" ||
        !("substitution" in item)
      ) {
        throw new ApiError(502, "AI returned malformed ingredient structure");
      }
    }

    return new ApiResponse(
      200,
      parsed,
      "Halal verification completed successfully"
    );

  } catch (error) {

    if (error instanceof ApiError) {
      throw error;
    }

    console.error("Halal verification AI error:", error);

    throw new ApiError(
      500,
      "Halal verification failed",
      [],
      error.stack
    );
  }
};

export { halalVerificationService };