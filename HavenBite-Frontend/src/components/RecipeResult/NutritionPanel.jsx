import { useState } from "react";
import { LayoutGrid, WifiOff } from "lucide-react";
import { useRecipeContext } from "../../context/RecipeContext";

function NutritionRow({ label, value, unit, percent }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[#F0EBE3] last:border-0">
      <div className="flex flex-col">
        <span className="text-xs font-bold tracking-widest uppercase text-[#999]">{label}</span>
        {percent && (
          <span className="text-[10px] text-[#bbb]">{percent}% daily needs</span>
        )}
      </div>
      <span className="text-sm font-bold text-[#1a1a1a] bg-[#F5F2EC] px-3 py-1 rounded-lg">
        {value} {unit}
      </span>
    </div>
  );
}

function Toggle({ enabled, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-10 h-5 rounded-full relative transition-colors duration-300 focus:outline-none
        ${enabled ? "bg-[#2D5016]" : "bg-[#D1CBC0]"}`}
    >
      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300
        ${enabled ? "left-5" : "left-0.5"}`}
      />
    </button>
  );
}

// Skeleton row shown while loading
function SkeletonRow() {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[#F0EBE3] last:border-0">
      <div className="flex flex-col gap-1">
        <div className="w-16 h-2.5 bg-[#E8E2D9] rounded animate-pulse" />
        <div className="w-10 h-2 bg-[#F0EBE3] rounded animate-pulse" />
      </div>
      <div className="w-16 h-7 bg-[#E8E2D9] rounded-lg animate-pulse" />
    </div>
  );
}

export default function NutritionPanel() {
  const { nutritionResult, isNutritionLoading, nutritionError } = useRecipeContext();
  const [showNutrition, setShowNutrition] = useState(true);

  const rows = nutritionResult
    ? [
        { label: "Calories",    value: nutritionResult.calories?.amount,           unit: nutritionResult.calories?.unit,           percent: nutritionResult.calories?.percentOfDailyNeeds },
        { label: "Protein",     value: nutritionResult.protein?.amount,            unit: nutritionResult.protein?.unit,            percent: nutritionResult.protein?.percentOfDailyNeeds },
        { label: "Carbs",       value: nutritionResult.carbs?.amount,              unit: nutritionResult.carbs?.unit,              percent: nutritionResult.carbs?.percentOfDailyNeeds },
        { label: "Fat",         value: nutritionResult.fat?.amount,                unit: nutritionResult.fat?.unit,                percent: nutritionResult.fat?.percentOfDailyNeeds },
        { label: "Per Serving", value: nutritionResult.weightPerServing?.amount,   unit: nutritionResult.weightPerServing?.unit,   percent: null },
      ]
    : [];

  return (
    <div className="bg-white border border-[#E8E2D9] rounded-xl px-5 py-5 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <LayoutGrid size={15} strokeWidth={2} color="#2D5016" />
          <span className="text-sm font-bold text-[#1a1a1a]">Nutrition</span>
        </div>
        {/* Only show toggle when there's something to toggle */}
        {!isNutritionLoading && !nutritionError && nutritionResult && (
          <Toggle enabled={showNutrition} onToggle={() => setShowNutrition((prev) => !prev)} />
        )}
      </div>

      {/* Loading skeleton */}
      {isNutritionLoading && (
        <div className="flex flex-col">
          {/* Breakdown bar skeleton */}
          <div className="w-full h-2 bg-[#E8E2D9] rounded-full animate-pulse mb-4" />
          {/* Legend skeleton */}
          <div className="flex gap-3 mb-4">
            {[1,2,3].map(i => (
              <div key={i} className="w-16 h-3 bg-[#E8E2D9] rounded animate-pulse" />
            ))}
          </div>
          {/* Row skeletons */}
          {[1,2,3,4,5].map(i => <SkeletonRow key={i} />)}
        </div>
      )}

      {/* Error state */}
      {!isNutritionLoading && nutritionError && (
        <div className="flex flex-col items-center gap-2 py-6 text-center">
          <div className="w-10 h-10 rounded-full bg-[#FFF8F5] flex items-center justify-center">
            <WifiOff size={18} strokeWidth={1.8} color="#C8572B" />
          </div>
          <p className="text-sm font-semibold text-[#1a1a1a]">Nutrition Info Unavailable</p>
          <p className="text-xs text-[#999] leading-relaxed">
            The nutrition service is currently unreachable. Your recipe is ready — try again later.
          </p>
        </div>
      )}

      {/* Actual data */}
      {!isNutritionLoading && !nutritionError && nutritionResult && (
        <>
          {/* Macro breakdown bar */}
          <div className="flex rounded-full overflow-hidden h-2 mb-4">
            <div className="bg-[#2D5016]" style={{ width: `${nutritionResult.breakdown?.percentProtein}%` }} title={`Protein ${nutritionResult.breakdown?.percentProtein}%`} />
            <div className="bg-[#C8572B]" style={{ width: `${nutritionResult.breakdown?.percentFat}%` }}     title={`Fat ${nutritionResult.breakdown?.percentFat}%`} />
            <div className="bg-[#E8A838]" style={{ width: `${nutritionResult.breakdown?.percentCarbs}%` }}   title={`Carbs ${nutritionResult.breakdown?.percentCarbs}%`} />
          </div>

          {/* Breakdown legend */}
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center gap-1 text-[10px] text-[#666]"><span className="w-2 h-2 rounded-full bg-[#2D5016] inline-block" />Protein {nutritionResult.breakdown?.percentProtein}%</span>
            <span className="flex items-center gap-1 text-[10px] text-[#666]"><span className="w-2 h-2 rounded-full bg-[#C8572B] inline-block" />Fat {nutritionResult.breakdown?.percentFat}%</span>
            <span className="flex items-center gap-1 text-[10px] text-[#666]"><span className="w-2 h-2 rounded-full bg-[#E8A838] inline-block" />Carbs {nutritionResult.breakdown?.percentCarbs}%</span>
          </div>

          {/* Collapsible rows */}
          <div className={`overflow-hidden transition-all duration-300 ${showNutrition ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="flex flex-col">
              {rows.map((row) => (
                <NutritionRow key={row.label} label={row.label} value={row.value} unit={row.unit} percent={row.percent} />
              ))}
            </div>
          </div>

          {!showNutrition && (
            <p className="text-xs text-[#bbb] italic mt-1">Toggle to view nutrition info</p>
          )}
        </>
      )}

    </div>
  );
}