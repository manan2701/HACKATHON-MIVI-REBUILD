import React, { useEffect, useRef } from "react";
import "./HeroSection2.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedBackground from "./AnimatedBackground";

gsap.registerPlugin(ScrollTrigger);

const HeroSection2 = () => {
  const wakeUpRef = useRef(null);
  const topSectionRef = useRef(null);

  // Keep existing GSAP animations for .ai-word and .multi-word
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
    // Wake up section animations
    const wakeUpTl = gsap.timeline();
    wakeUpTl.fromTo(
      ".wake-up-image",
      { y: 100, opacity: 0 },
      {
        y: -100,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".wake-up-image",
          start: "top 90%",
          end: "bottom 10%",
          scrub: true,
        },
      }
    );
    wakeUpTl.fromTo(
      ".wake-up-text p span",
      { opacity: 0.1, y: 10 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger:".wake-up-text p span",
          start: "top 90%",
          end: "bottom 40%",
          scrub: true,
        },
      }
    );
    wakeUpTl.fromTo(
     ".wake-up-text h1 span",
      { opacity: 0.1, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger:".wake-up-text h1 span",
          start: "top 90%",
          end: "bottom 40%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className="hero-section2">
      <div className="hero-section-top" ref={topSectionRef}>
        <p className="ai-line">
          {`Mivi AI Buds, powered by built-in Mivi AI, mark the first step in the human and AI relationship. Designed for voice-only conversations, just plug in and say "Hi Mivi" to get started.`
            .split(" ")
            .map((word, i) => (
              <span key={i} className="ai-word">
                {word}&nbsp;
              </span>
            ))}
        </p>

        {/* <div className="android-image" ref={androidRef}>
          <img width={"100%"} src="/assets/android.png" alt="" />
        </div> */}
      </div>

      <div className="wake-up" ref={wakeUpRef}>
        <div className="wake-up-image">
          <img
            src="https://www.mivi.in/cdn/shop/files/Girl_image_Desktop_copy.webp?v=1751457523&width=2500&format=webp&quality=100"
            alt=""
          />
        </div>
        <div className="wake-up-text">
          <p>
            {`Wake them up by saying`.split(" ").map((word, i) => (
              <span key={i} className="wakeup-word">
                {word}&nbsp;
              </span>
            ))}
          </p>
          <h1><span>"</span><span>Hi</span>{" "}<span>Mivi</span><span>"</span></h1>
        </div>
      </div>
      <AnimatedBackground/>
    </div>
  );
};

export default HeroSection2;
