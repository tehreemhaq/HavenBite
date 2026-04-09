import React from 'react'

const HeroContent = () => {
  return (
    <div className="flex flex-col items-start justify-center w-full lg:w-1/2 py-12 lg:py-20">

      {/* Badge */}
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2 h-2 rounded-full bg-[#2D5016]" />
        <span className="text-xs font-semibold tracking-widest uppercase text-[#2D5016]">
          Halal-Focused Recipe Generation
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-tight mb-6">
        Your Ingredients.<br />
        A <span className="text-[#2D5016]">Halal</span> Recipe.<br />
        Instantly.
      </h1>

      {/* Subtext */}
      <p className="text-[#666] text-base sm:text-lg leading-relaxed max-w-md mb-10">
        Enter what's in your kitchen and get a complete Halal-verified recipe —
        with ingredient substitutions and nutritional info .
      </p>

      {/* CTA */}
      <div className="flex flex-wrap items-center gap-5">
        
         <a href="#generator"
          className="inline-flex items-center gap-2 bg-[#2D5016] hover:bg-[#3a6b1e] text-white text-sm font-semibold px-6 py-3 rounded-md transition-colors duration-200"
        >
          Start Cooking Now
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

    </div>
  );
}

export default HeroContent