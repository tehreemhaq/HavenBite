const ProcessCard = ({ step, title, description, isHighlighted }) => {
  return (
    <div
      className={`relative flex flex-col gap-4 rounded-xl border p-6
        transition-all duration-500 ease-in-out
        ${isHighlighted
          ? "bg-white border-transparent border-t-[#2D5016] border-t-4 shadow-xl -translate-y-3 scale-[1.02]"
          : "bg-white border-[#E8E2D9] shadow-sm translate-y-0 scale-100"
        }`}
    >
      {/* Step number badge */}
      <span
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
          transition-all duration-500
          ${isHighlighted
            ? "bg-[#2D5016] text-white"
            : "bg-[#F5F2EC] text-[#888]"
          }`}
      >
        {step}
      </span>

      {/* Title */}
      <h3 className="text-base font-bold text-[#1a1a1a]">{title}</h3>

      {/* Description */}
      <p className="text-sm text-[#888] leading-relaxed">{description}</p>
    </div>
  )
}

export default ProcessCard