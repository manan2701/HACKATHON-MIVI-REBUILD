import React, { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './OurStory.css';

gsap.registerPlugin(ScrollTrigger);

const OurStory = () => {
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  const missionRef = useRef(null);
  const founderRef = useRef(null);
  const futureRef = useRef(null);
  const achievementsRef = useRef(null);

  const founderInfo = {
    name: "Midhula Devabhaktuni",
    title: "Co-Founder, Mivi",
    roles: [
      "Director, Avishkaran",
      "Co-Founder, Mivi"
    ],
    bio: "Building India's very own hearables and wearables",
    company: "Mivi",
    education: "Florida State University - College of Business",
    location: "Hyderabad, Telangana, India",
    image : "/assets/founder.jpg"
  };

  const miviTimeline = [
    { year: "2015", description: "Incorporated with the mission of making quality electronics" },
    { year: "2016", description: "Went to market with cables and chargers" },
    { year: "2017", description: "Entered the audio space with Bluetooth earphones" },
    { year: "2018", description: "Unveiled our speaker portfolio" },
    { year: "2020", description: "Launched first audio Manufacturing plant with single line with 7 people" },
    { year: "2021", description: "First 100% Made in India audio brand" },
    { year: "2022", description: "1500+ workforce, 85% women employees" },
    { year: "2023", description: "Introduced 3D Soundstage, launched Home Audio Category" },
    { year: "2024", description: "Started India's largest audio R&D unit" },
    { year: "2024-2", description: "Launched SuperPods and 5.2 channel Home Audio" },
    { year: "2025", description: "Unveiled Mivi AI with human-like intelligence" }
  ];

  useGSAP(() => {
    gsap.from(".hero-title", { y: 50, opacity: 0, duration: 1, delay: 0.3 });
    gsap.from(".hero-subtext", { y: 30, opacity: 0, duration: 1, delay: 0.6 });
    ScrollTrigger.create({
      trigger: missionRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(missionRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
      },
      once: true
    });
    ScrollTrigger.create({
      trigger: founderRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(".founder-image", { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
        gsap.to(".founder-info", { x: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power2.out" });
      },
      once: true
    });
    if (timelineRef.current) {
      const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
      timelineItems.forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 80%",
          onEnter: () => {
            gsap.to(item, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
          },
          once: true
        });
      });
    }
    ScrollTrigger.create({
      trigger: futureRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(futureRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
      },
      once: true
    });
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 85%",
        onEnter: () => {
          gsap.to(card, { scale: 1, opacity: 1, duration: 0.6, delay: index * 0.15, ease: "back.out(1.7)" });
        },
        once: true
      });
    });
  }, []);

  return (
    <div className="our-story-container">
      <div className="hero-section" ref={heroRef}>
        <div className="hero-content">
          <h1 className="hero-title">Our Story</h1>
          <p className="hero-subtext">Building India's future in audio technology</p>
        </div>
      </div>
      <div className="mission-section" ref={missionRef} style={{ opacity: 0, transform: 'translateY(50px)' }}>
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            At Mivi, we're on a mission to revolutionize the audio industry in India. 
            We believe in creating world-class products that are designed and made in India, 
            delivering exceptional quality and innovation to our customers.
          </p>
        </div>
      </div>
      <div className="founder-section" ref={founderRef}>
        <div className="founder-content">
          <div className="founder-image" style={{ opacity: 0, transform: 'translateX(-50px)' }}>
            <div className="image-placeholder">
              <div className="founder-image-frame">
                <img 
                  src={founderInfo.image} 
                  alt={founderInfo.name} 
                  onError={(e) => { e.target.src = "/assets/founder.jpg"; }} 
                />
              </div>
            </div>
          </div>
          <div className="founder-info" style={{ opacity: 0, transform: 'translateX(50px)' }}>
            <h2>{founderInfo.name}</h2>
            <h3>{founderInfo.title}</h3>
            <p className="founder-bio">{founderInfo.bio}</p>
            <div className="founder-details">
              <div className="detail-item">
                <span className="detail-label">Education</span>
                <span className="detail-value">{founderInfo.education}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Location</span>
                <span className="detail-value">{founderInfo.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="timeline-section">
        <h2>Our Journey</h2>
        <div className="timeline" ref={timelineRef}>
          {miviTimeline.map((item, index) => (
            <div 
              className="timeline-item" 
              key={`${item.year}-${index}`}
              style={{ opacity: 0, transform: 'translateY(30px)' }}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3 className="timeline-year">{item.year}</h3>
                <p className="timeline-description">{item.description}</p>
              </div>
            </div>
          ))}
          <div className="timeline-line"></div>
        </div>
      </div>
      <div className="future-section" ref={futureRef} style={{ opacity: 0, transform: 'translateY(50px)' }}>
        <div className="future-content">
          <h2>Future Vision</h2>
          <p>
            As we continue to grow, our vision extends beyond creating audio products. 
            We aim to build a technology ecosystem that empowers Indian innovation and 
            craftsmanship on the global stage. With initiatives like India's largest audio 
            R&D unit and our exploration into AI, we're committed to pushing boundaries 
            and redefining what's possible in consumer electronics.
          </p>
        </div>
      </div>
      <div className="achievements-section" ref={achievementsRef}>
        <h2>Key Milestones</h2>
        <div className="achievements-grid">
          <div className="achievement-card" style={{ opacity: 0, scale: 0.9 }}>
            <h3>100%</h3>
            <p>Made in India</p>
          </div>
          <div className="achievement-card" style={{ opacity: 0, scale: 0.9 }}>
            <h3>1500+</h3>
            <p>Workforce</p>
          </div>
          <div className="achievement-card" style={{ opacity: 0, scale: 0.9 }}>
            <h3>85%</h3>
            <p>Women Employees</p>
          </div>
          <div className="achievement-card" style={{ opacity: 0, scale: 0.9 }}>
            <h3>#1</h3>
            <p>Audio R&D Unit in India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory; 