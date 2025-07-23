import React from 'react'
import Hero from '../components/Hero'
import HeroSection2 from '../components/HeroSection2'
import HeroSection3 from '../components/HeroSection3'
import HorizontalScrollSection from '../components/HorizontalScrollSection'
import HeroSection4 from '../components/HeroSection4'

const Home = () => {
  return (
    <div>
      <Hero /> 
      <HeroSection2 />
      <HorizontalScrollSection />
      <HeroSection3 />
      <HeroSection4 />
    </div>
  )
}

export default Home