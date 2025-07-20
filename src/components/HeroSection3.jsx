import React, { useRef } from 'react'
import "./HeroSection3.css"
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const HeroSection3 = () => {
    const videoRef = useRef(null);
    useGSAP(() => {
        gsap.fromTo(
            videoRef.current,
            {
              opacity: 0,
              scale: 0.9,
              rotationY: -15,
            },
            {
              opacity: 1,
              scale: 1,
              rotationY: -5,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: videoRef.current,
                start: "top 80%",
                end: "top 30%",
                scrub: true,
              },
            }
          );  
        },[])   

        useGSAP(() => {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: ".multi-lang-content",
                start: "top 85%",
                end: "bottom 65%",
                scrub: 1,
              },
            });
            tl.fromTo(
              ".multi-word",
              { opacity: 0.1, y: 10 },
              {
                opacity: 1,
                y: 0,
                stagger: 0.08,
                ease: "power2.out",
              }
            );
          }, []);
  return (
    <div className="hero-section3">
        <div className="multi-language">
        <div className="multi-lang-content">
          <h1>
            <span className="multi-word">Multilingual.</span>
          </h1>
          <h1>
            <span className="multi-word">Multitalented.</span>
          </h1>
          <h1>
            <span className="multi-word">
              Just like <br /> Humans.
            </span>
          </h1>
          <p>
            Say "Hi Mivi" and speak in up to 8 <br />
            Indian languages apart from
            <br />
            English. No switching, no settings.
          </p>
        </div>
        <div className="multi-lang-video">
          <video
            ref={videoRef}
            src="https://www.mivi.in/cdn/shop/videos/c/vp/27863044c6104d11bb3cf1abddb746b9/27863044c6104d11bb3cf1abddb746b9.SD-480p-0.9Mbps-50498716.mp4?v=0"
            autoPlay
            loop
            muted
            width={"80%"}
          ></video>
        </div>
      </div>

        <div className="hero-section3-top"></div>
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