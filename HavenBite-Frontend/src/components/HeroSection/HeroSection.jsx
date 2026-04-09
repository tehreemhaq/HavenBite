import React from 'react'
import HeroContent from './HeroContent'
import HeroImageCard from './HeroImageCard'

const HeroSection = () => {
  return (
   <section className="w-full bg-[#FAF9F3] min-h-[calc(100vh-64px)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        <HeroContent />
        <HeroImageCard />
      </div>
    </section>
  )
}

export default HeroSection