import React from 'react'
import HeroSection from '../components/HeroSection/HeroSection'
import RecipeGenerator from '../components/RecipeGenerator/RecipeGenerator'
import TheProcess from '../components/TheProcess/TheProcess'
import ComparisonBlock from '../components/TheComparison/ComparisonBlock'

const Home = () => {
  return (
    <div>
        <HeroSection />
        <RecipeGenerator />
        <TheProcess />
        <ComparisonBlock />
    </div>
  )
}

export default Home