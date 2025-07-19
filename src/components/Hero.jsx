import React, { useRef } from "react";
import Video from "../components/Video";
import "./Hero.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Home = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".ai-buds-title span", {
      left: "-100%",
      duration: 1.5,
      delay: 1.5,
      opacity: 0,
      ease: "power2.inOut",
      stagger: 0.5,
      reversed: true,
    });
    tl.from(".ai-buds-tagline span", {
      duration: 1.5,
      opacity: 0,
      ease: "power2.inOut",
      stagger: 0.5,
    }, "-=0.5");
    tl.from(".ai-buds-note", {
      top: "10px",
      duration: 0.5,
      opacity: 0,
      ease: "power2.inOut",
      delay: 1.5,
    }, "-=2");
    tl.from(".explore-btn", {
      right: "-15%",
      duration: 1.5,
      opacity: 0,
      ease: "power2.inOut",
      delay: 1.5,
    }, "-=1.5");
  }, []);

  return (
    <div ref={sectionRef} className="home-container">
      
      <Video />
      <section className="ai-buds">
        <h1 className="ai-buds-title">
          <span>AI</span>
          <span>-</span>
          <span>BUDS</span>
        </h1>
        <p className="ai-buds-tagline">
          <span>Buds </span> 
          <span>with </span> 
          <span>Brain </span>
        </p>
        <p className="ai-buds-note">
          For Android Only <img src="https://www.mivi.in/cdn/shop/files/Frame_2_0877e40f-2f0a-465c-a5da-9eae8c46e5ad_100x.svg?v=1751182108" alt="android" />
          </p>
      </section>
      <div className="hero-price">
      <p><span>₹</span>6999</p>
      </div>
      <div className="home-button">
        <button className="explore-btn">
          Explore
          <svg
            className="arrow-icon"
            viewBox="0 0 16 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
              className="arrow-path"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Home;
