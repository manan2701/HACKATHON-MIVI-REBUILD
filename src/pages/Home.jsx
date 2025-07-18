import React from 'react'
import Video from '../components/Video'
import './Home.css'

const Home = () => {
  return (
    <div className="home-container data-scroll-section">  
      <div className="blank"></div>   
    <Video/>
      <section className="ai-buds">
        <h1>AI-BUDS</h1>
        <p className="ai-buds-tagline">Buds with Brain</p>
        <p className="ai-buds-note">For Android Only</p>
      </section>
      <div className="home-button">
        <button className="buy-now-btn">Buy Now</button>
      </div>
    <section className="features" id="products">
      <div className="feature-card">
        <i className="ri-box-3-fill"></i>
        <h3>Dolby Audio</h3>
        <p>Enjoy theatre-like Dolby sound and step into every action with cinematic audio tuned perfectly for you.</p>
      </div>
      <div className="feature-card">
        <i className="ri-music-ai-line"></i>
        <h3>MIVI AI</h3>
        <p>Meet the world’s first Human-like AI Buds. Just say “Hi Mivi” to start a real conversation just like a companion.</p>
      </div>
      <div className="feature-card">
        <i className="ri-timer-flash-line"></i>
        <h3>LDAC</h3>
        <p>Experience lossless audio tech that transmits Hi-res Audio content in full HD from devices to earbuds via Bluetooth.</p>
      </div>
    </section>
  </div>
  )
}

export default Home