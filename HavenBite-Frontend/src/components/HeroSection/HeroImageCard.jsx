import React from 'react'

const  HeroImageCard = ()=> {
  return (
   

<div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center py-8 lg:py-0">
      
      {/* Card container — relative so overlay can anchor to bottom */}
      <div className="relative w-full max-w-md lg:max-w-lg rounded-2xl overflow-hidden shadow-2xl">

        {/*
          IMAGE SOURCES — pick any one:
          1. Unsplash: https://unsplash.com/s/photos/halal-food
             CDN: https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80
          2. Pexels: https://www.pexels.com/search/halal%20food/
          3. Local: src="/assets/hero-food.jpg"
        */}
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
          alt="Fresh ingredients for Halal cooking"
          className="w-full h-72 sm:h-96 lg:h-115 object-cover block"
        />

        {/* Overlay card — absolutely pinned to bottom, sits ON the image */}
        <div className="absolute bottom-0 left-0 right-0 bg-white px-5 py-4">
          {/* Label */}
          <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-[#999] mb-1">
            Featured Recipe
          </p>

          {/* Recipe name */}
          <p className="text-[15px] font-bold text-[#1a1a1a] mb-2">
            Moroccan Spiced Lamb Stew
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-4">
            {/* Time */}
            <span className="flex items-center gap-1 text-[11px] text-[#999]">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              45 Mins
            </span>

            {/* Beginner Friendly */}
            <span className="flex items-center gap-1 text-[11px] text-[#2D5016] font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
              Beginner Friendly
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HeroImageCard