import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import './HeroSection5.css';

gsap.registerPlugin(ScrollTrigger);

const engineeringData = [
  {
    id: 1,
    image: "https://www.mivi.in/cdn/shop/files/Component_28_0734d3cb-7e3e-49f0-acc4-5c4cde181cb2.png?v=1751546324",
    title: "Optimising\nPerformance",
    shortDesc: "Fine-tuned firmware understands your voice in real time, without draining battery.",
    longDesc: "The Mivi AI-Buds use custom firmware to understand your voice with speed and accuracy. This entire process is engineered to be incredibly efficient, delivering powerful real-time AI processing without the significant battery drain typically associated with such demanding tasks."
  },
  {
    id: 2,
    image: "https://www.mivi.in/cdn/shop/files/Frame_2147226854.png?v=1751546393",
    title: "The AI that\nconstantly evolves.",
    shortDesc: "Our AI is always updated with fresh data for relevant, timely conversations.",
    longDesc: "Our AI has the latest, up-to-date information, unlike static models. It is continuously updated with fresh data directly from Mivi's servers. This dynamic approach keeps the AI relevant for timely topics, enabling meaningful conversations about current events and much more."
  },
  {
    id: 3,
    image: "https://www.mivi.in/cdn/shop/files/Frame_2147226855.png?v=1751546393",
    title: "Optimising clarity\nfor voice inputs",
    shortDesc: "Trained with thousands of voices and 50 microphones for unmatched voice clarity.",
    longDesc: "To ensure the AI responds perfectly to \"Hi Mivi,\" we collected thousands of voice samples across diverse accents, speech patterns, and noisy environments. We then rigorously tested 50 different microphones to select the one that captures your voice with absolute maximum clarity."
  }
];

const HeroSection5 = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [flippedCards, setFlippedCards] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "top 30%",
        scrub: 1,
      }
    });
    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  const handleFlipCard = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div ref={sectionRef} className="engineering-section">
      <h2 ref={headingRef} className="engineering-heading">
        The Engineering<br /> behind Mivi AI.
      </h2>
      <div ref={cardsContainerRef} className="engineering-cards-container">
        {engineeringData.map((item) => (
          <div
            key={item.id}
            className={`engineering-card flip-card ${flippedCards[item.id] ? 'flipped' : ''}`}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="card-image-container">
                  <img src={item.image} alt={item.title} className="card-image" />
                </div>
                <div className="card-content">
                  <h3>{item.title}</h3>
                  <p>{item.shortDesc}</p>
                  <div className="card-link">
                    <button onClick={(e) => handleFlipCard(item.id, e)}>
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
              <div className="flip-card-back">
                <div className="card-image-container">
                  <img src={item.image} alt={item.title} className="card-image" />
                </div>
                <div className="back-content">
                  <p>{item.longDesc}</p>
                  <div className="show-less-button">
                    <button onClick={(e) => handleFlipCard(item.id, e)}>
                      Show Less
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection5;
