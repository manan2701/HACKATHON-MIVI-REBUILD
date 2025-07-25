import React, { useRef, useEffect } from "react";
import Video from "./Video";
import "./Hero.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const noteRef = useRef(null);
  const priceRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const { clientX, clientY } = e;
      const x = clientX / window.innerWidth;
      const y = clientY / window.innerHeight;
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          x: (x - 0.5) * 20,
          y: (y - 0.5) * 10,
          duration: 0.5,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".ai-buds-title span", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      delay: 0.5,
      ease: "power3.out",
      stagger: 0.2,
    });
    tl.from(".ai-buds-tagline span", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      stagger: 0.15,
    }, "-=0.8");
    tl.from(".ai-buds-note", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.6");
    tl.from(".hero-price", {
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    }, "-=0.7");
    tl.from(".explore-button", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.5");
  }, []);

  const handleExploreClick = () => {
    navigate('/products/68811f5d6d73fd0ed63ec56d');
  }

  return (
    <div ref={sectionRef} className="home-container">
      <Video />
      <section className="ai-buds">
        <h1 ref={titleRef} className="ai-buds-title">
          <span>AI</span>
          <span>-</span>
          <span>BUDS</span>
        </h1>
        <p ref={taglineRef} className="ai-buds-tagline">
          <span>Buds</span> 
          <span>with</span> 
          <span>Brain</span>
        </p>
        <p ref={noteRef} className="ai-buds-note">
          For Android Only <img src="https://www.mivi.in/cdn/shop/files/Frame_2_0877e40f-2f0a-465c-a5da-9eae8c46e5ad_100x.svg?v=1751182108" alt="android" />
        </p>
      </section>
      <div ref={priceRef} className="hero-price">
        <p><span>₹</span>6999</p>
      </div>
      <div ref={buttonRef} className="home-button">
        <button className="explore-button" onClick={handleExploreClick}>
          Explore
          <svg className="arrow-icon" viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Hero;
