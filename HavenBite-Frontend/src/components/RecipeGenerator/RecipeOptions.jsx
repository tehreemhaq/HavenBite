import { useState, useEffect } from "react";

const servingSizes = [
  { label: "1 Person", value: 1 },
  { label: "2 People", value: 2 },
  { label: "4 People", value: 4 },
  { label: "6 People", value: 6 },
  { label: "8 People", value: 8 }
];

const cuisineStyles = [
  "Japanese",
  "Indian",
  "Pakistani",
  "Italian",
  "Chinese",
  "Spanish",
  "Mexican",
  "Thai",
  "Turkish",
  "French",
  "Korean",
  "Lebanese",
  "American",
  "Other"
];

const RecipeOptions = ({
  servingSize,
  cuisineStyle,
  onServingChange,
  onCuisineChange
}) => {

  const [customCuisine, setCustomCuisine] = useState("");

  // If parent already has a custom cuisine, sync it
  useEffect(() => {
    if (cuisineStyle && !cuisineStyles.includes(cuisineStyle)) {
      setCustomCuisine(cuisineStyle);
    }
  }, [cuisineStyle]);

  const handleCuisineChange = (value) => {
    if (value === "Other") {
      onCuisineChange(""); // clear until user types
    } else {
      setCustomCuisine("");
      onCuisineChange(value);
    }
  };

  const handleCustomCuisineChange = (value) => {
    setCustomCuisine(value);
    onCuisineChange(value);
  };

  return (
    <div className="flex flex-col gap-4 w-full">

      {/* Serving Size */}
      <div>
        <label className="block text-xs font-semibold text-[#333] uppercase tracking-wider mb-2">
          Serving Size
        </label>
        <div className="relative">
          <select
            value={servingSize}
            onChange={(e) => onServingChange(Number(e.target.value))}
            className="w-full appearance-none border border-[#E0DAD0] rounded-lg px-4 py-2.5 text-sm text-[#333] bg-[#FAF9F3] focus:outline-none focus:ring-2 focus:ring-[#2D5016]/30 focus:border-[#2D5016] transition-all duration-200 cursor-pointer"
          >
            {servingSizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>

          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#999]">
            ▼
          </span>
        </div>
      </div>

      {/* Cuisine */}
      <div>
        <label className="block text-xs font-semibold text-[#333] uppercase tracking-wider mb-2">
          Cuisine
        </label>

        <div className="relative">
          <select
            value={
              cuisineStyles.includes(cuisineStyle)
                ? cuisineStyle
                : "Other"
            }
            onChange={(e) => handleCuisineChange(e.target.value)}
            className="w-full appearance-none border border-[#E0DAD0] rounded-lg px-4 py-2.5 text-sm text-[#333] bg-[#FAF9F3] focus:outline-none focus:ring-2 focus:ring-[#2D5016]/30 focus:border-[#2D5016] transition-all duration-200 cursor-pointer"
          >
            {cuisineStyles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>

          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#999]">
            ▼
          </span>
        </div>

        {/* Custom Cuisine Input */}
        {(!cuisineStyles.includes(cuisineStyle) || cuisineStyle === "") && (
          <input
            type="text"
            value={customCuisine}
            onChange={(e) => handleCustomCuisineChange(e.target.value)}
            placeholder="Enter cuisine (e.g., Moroccan)"
            className="mt-3 w-full border border-[#E0DAD0] rounded-lg px-4 py-2.5 text-sm text-[#333] bg-[#FAF9F3] focus:outline-none focus:ring-2 focus:ring-[#2D5016]/30 focus:border-[#2D5016] transition-all duration-200"
          />
        )}
      </div>

    </div>
  );
};

export default RecipeOptions;