import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './HeroSection5.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Engineering data
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
  const [flippedCards, setFlippedCards] = useState({});

  // GSAP animations
  useGSAP(() => {
    // Main section entrance animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "top 30%",
        scrub: 1,
      }
    });

    // Animate heading with split text effect
    tl.fromTo(
      headingRef.current,
      { 
        opacity: 0, 
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      }
    );

    // Animate card content elements
    gsap.fromTo(
      ".card-content h3",
      { 
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".engineering-swiper",
          start: "top 60%",
          toggleActions: "play none none none"
        }
      }
    );

    gsap.fromTo(
      ".card-content p",
      { 
        opacity: 0,
        y: 15,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".engineering-swiper",
          start: "top 60%",
          toggleActions: "play none none none"
        }
      }
    );

    // Create a parallax effect on the card images
    gsap.fromTo(
      ".card-image",
      {
        y: 20,
      },
      {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".engineering-swiper",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );

    return () => {
      // Clean up scroll triggers when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Handle card flip
  const handleFlipCard = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setFlippedCards(prev => {
      const isFlipping = !prev[id];
      return {
        ...prev,
        [id]: isFlipping
      };
    });
  };

  return (
    <div ref={sectionRef} className="engineering-section">
      <h2 ref={headingRef} className="engineering-heading">
        The Engineering<br/> behind Mivi AI.
      </h2>
      
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1.5,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        className="engineering-swiper"
      >
        {engineeringData.map((item, index) => (
          <SwiperSlide key={item.id} className="engineering-slide">
            <div 
              className={`engineering-card flip-card ${flippedCards[item.id] ? 'flipped' : ''}`}
              data-id={item.id}
            >
              {/* Front of card */}
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="card-image-container">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="card-image"
                    />
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
                
                {/* Back of card */}
                <div className="flip-card-back">
                  <div className="card-image-container">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="card-image"
                    />
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
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};

export default HeroSection5; 