import React from 'react'
import Hero from '../components/Home/Hero'
import HeroSection2 from '../components/Home/HeroSection2'
import HeroSection3 from '../components/Home/HeroSection3'
import HorizontalScrollSection from '../components/Home/HorizontalScrollSection'
import HeroSection4 from '../components/Home/HeroSection4'
import HeroSection5 from '../components/Home/HeroSection5'

const Home = () => {
  return (
    <div>
      <Hero /> 
      <HeroSection2 />
      <HorizontalScrollSection />
      <HeroSection3 />
      <HeroSection4 />
      <HeroSection5 />
    </div>
  )
}

export default Home