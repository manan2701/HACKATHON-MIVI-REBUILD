import React, { useEffect } from "react";
import "./HeroSection2.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HorizontalScrollSection from "./HorizontalScrollSection";

gsap.registerPlugin(ScrollTrigger);

const HeroSection2 = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".ai-line",
        start: "top 85%",
        end: "bottom 65%",
        scrub: 1,
      },
    });
    tl.fromTo(
      ".ai-word",
      { opacity: 0.1, y: 10 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        ease: "power2.out",
      }
    );
  }, []);

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
    <div className="hero-section2">
      <div className="hero-section-top">
        <p className="ai-line">
          {`Mivi AI Buds, powered by built-in Mivi AI, mark the first step in the human and AI relationship. Designed for voice-only conversations, just plug in and say “Hi Mivi” to get started.`
            .split(" ")
            .map((word, i) => (
              <span key={i} className="ai-word">
                {word}&nbsp;
              </span>
            ))}
        </p>

      </div>
  
      <div className="wake-up">
          <div className="wake-up-image">
            <img src="https://www.mivi.in/cdn/shop/files/Girl_image_Desktop_copy.webp?v=1751457523&width=2500&format=webp&quality=100" alt="" />
          </div>
          <div className="wake-up-text">
          <p>Wake them up by saying</p>
          <h1>"Hi Mivi"</h1>
        </div>
      </div>
      {/* <HorizontalScrollSection /> */}
      <div className="multi-language">
        <div className="multi-lang-content">
          <h1><span className="multi-word">Multilingual.</span></h1>
          <h1><span className="multi-word">Multitalented.</span></h1>
          <h1><span className="multi-word">Just like <br/> Humans.</span></h1>
          <p>
            Say “Hi Mivi” and speak in up to 8 <br/>Indian languages apart from
            <br/>English. No switching, no settings.
          </p>
        </div>
        <div className="multi-lang-video">
          <video
            src="https://www.mivi.in/cdn/shop/videos/c/vp/27863044c6104d11bb3cf1abddb746b9/27863044c6104d11bb3cf1abddb746b9.SD-480p-0.9Mbps-50498716.mp4?v=0"
            autoPlay
            loop
            muted
            width={"80%"}
          ></video>
        </div>
      </div>

    </div>
  );
};

export default HeroSection2;
