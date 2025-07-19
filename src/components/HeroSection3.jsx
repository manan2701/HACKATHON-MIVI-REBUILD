import React from 'react'
import "./HeroSection3.css"

const HeroSection3 = () => {
  return (
    <div className="hero-section3">
        <div className="hero-section3-left">
            <h1>Mivi AI Buds</h1>
        </div>
        <div className="hero-section3-right">
            <div className="hero-section3-right-top">
                {/* <img src={require("../assets/images/hero-section3-right-top.png")} alt="hero-section3-right-top" /> */}
            </div>
            <div className="hero-section3-right-bottom">
                <p>Mivi AI Buds, powered by built-in Mivi AI, mark the first step in the human and AI relationship. Designed for voice-only conversations, just plug in and say “Hi Mivi” to get started.</p>
            </div>
        </div>
    </div>
  )
}

export default HeroSection3