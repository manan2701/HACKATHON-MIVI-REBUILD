import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import 'swiper/css';
import 'swiper/css/effect-fade';
import './HeroSection4.css';

// Avatar data
const avatarData = [
  {
    id: 'wellness',
    title: 'Wellness Coach',
    heading: 'Your Wellness Companion',
    description: 'The Wellness Coach Avatar is here to listen when you\'re stressed, happy, upset, or just need to talk. It gives calm, supportive responses helping you feel understood, without judgment.',
    image: 'https://www.mivi.in/cdn/shop/files/Wellnes_Coach_copy.webp?v=1751464130&width=2500&format=webp&quality=100'
  },
  {
    id: 'chef',
    title: 'Chef Avatar',
    heading: 'Real-time Cooking Instructions',
    description: 'The Chef Avatar guides you through the cooking process, step by step. From prep to plating, it tells you exactly what you need and gives you suggestions on missing ingredients.',
    image: 'https://www.mivi.in/cdn/shop/files/Chef_Avatar_copy.webp?v=1751464131&width=2500&format=webp&quality=100'
  },
  {
    id: 'guru',
    title: 'Guru Avatar',
    heading: 'Ask anything. Understand everything.',
    description: 'Guru Avatar is your knowledge expert. Ask anything from space to history, or even everyday doubts. It explains things simply, in a way that makes sense to you. No jargon, just clear explanations given via conversations',
    image: 'https://www.mivi.in/cdn/shop/files/Guru_copy.webp?v=1751464131&width=2500&format=webp&quality=100'
  },
  {
    id: 'interview',
    title: 'Interview Avatar',
    heading: 'Ace Every Interview',
    description: 'The Interviewer Avatar helps you get better with your interview preparations. It tests your capabilities, gives you meaningful feedback, and builds your confidence, step by step.',
    image: 'https://www.mivi.in/cdn/shop/files/Interview_Avatar_copy.webp?v=1751464131&width=2500&format=webp&quality=100'
  },
  {
    id: 'news',
    title: 'News Agent',
    heading: 'Tailored News Curation',
    description: 'The News Reporter Avatar keeps you updated with real-time news, local or global. From sports to world events, it breaks down stories clearly and tailors updates to your interests.',
    image: 'https://www.mivi.in/cdn/shop/files/News_reporter_copy.webp?v=1751464131&width=2500&format=webp&quality=100'
  }
];

const HeroSection4 = () => {
  const [activeTab, setActiveTab] = useState('interview');
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [progressWidth, setProgressWidth] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  // GSAP animations
  useGSAP(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 60%",
          scrub: 1
        }
      }
    );

    gsap.fromTo(
      ".avatar-tabs-container",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 55%",
          scrub: 1
        }
      }
    );
  }, []);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Handle tab click
  const handleTabClick = (tabId, index) => {
    setActiveTab(tabId);
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }

    // Reset and start progress for the clicked tab
    setProgressWidth(prev => ({
      ...prev,
      [tabId]: 0
    }));

    setTimeout(() => {
      setProgressWidth(prev => ({
        ...prev,
        [tabId]: 100
      }));
    }, 50);
  };

  // Start progress animation for initial active tab
  useEffect(() => {
    if (activeTab) {
      setProgressWidth(prev => ({
        ...prev,
        [activeTab]: 100
      }));
    }
  }, [activeTab]);

  // Handle slide change from swiper
  const handleSlideChange = (swiper) => {
    const newActiveTab = avatarData[swiper.activeIndex].id;
    setActiveTab(newActiveTab);

    // Reset and start progress for all tabs
    const newProgressWidth = {};
    avatarData.forEach(avatar => {
      newProgressWidth[avatar.id] = avatar.id === newActiveTab ? 0 : 0;
    });
    setProgressWidth(newProgressWidth);

    // Start progress for active tab
    setTimeout(() => {
      setProgressWidth(prev => ({
        ...prev,
        [newActiveTab]: 100
      }));
    }, 50);

    // Force update for mobile view
    if (isMobile) {
      setTimeout(() => {
        if (swiperInstance) {
          swiperInstance.update();
        }
      }, 100);
    }
  };

  return (
    <div ref={sectionRef} className="avatar-section-wrapper">

      <div ref={headingRef} className="avatar-section-heading">
        <h2>Explore our AI Avatars</h2>
        <p>Select an avatar to learn more about their capabilities</p>
      </div>

      <div className="ai-buds-slider-component">
        {/* Tab navigation */}
        <div className="tab avatar-tabs-container">
          {avatarData.map((avatar, index) => (
            <button
              key={avatar.id}
              className={`tablinks ${activeTab === avatar.id ? 'active' : ''}`}
              onClick={() => handleTabClick(avatar.id, index)}
            >
              <span className="tab-text">{avatar.title}</span>
              <div className="tab-indicator"></div>
            </button>
          ))}
        </div>

        {/* Tab content with Swiper */}
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect={isMobile ? 'slide' : 'fade'}
          speed={500}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          onSwiper={setSwiperInstance}
          onSlideChange={handleSlideChange}
          className="tab-swiper"
          spaceBetween={20}
          watchSlidesProgress={true}
          slidesPerView={1}
        >
          {avatarData.map((avatar) => (
            <SwiperSlide key={avatar.id}>
              <div
                id={`tab-${avatar.id}`}
                className={`tabcontent ${activeTab === avatar.id ? 'active' : 'inactive'}`}
              >
                <div className="tab-text-content">
                  <h3>{avatar.heading}</h3>
                  <p>{avatar.description}</p>
                </div>
                <div className="tab-image">
                  <picture>
                    <source
                      type="image/webp"
                      media="(max-width: 360px)"
                      srcSet={avatar.image}
                    />
                    <source
                      type="image/webp"
                      media="(max-width: 768px)"
                      srcSet={avatar.image}
                    />
                    <source
                      type="image/webp"
                      srcSet={avatar.image}
                    />
                    <img
                      src={avatar.image}
                      alt={avatar.title}
                      loading="lazy"
                      style={{ objectFit: 'contain' }}
                    />
                  </picture>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Progress bars */}
        <div className="tab-progress-container">
          {avatarData.map((avatar) => (
            <div
              key={avatar.id}
              className={`tab-progress-bar ${activeTab === avatar.id ? 'active' : ''}`}
              data-tab={`tab-${avatar.id}`}
              onClick={() => handleTabClick(avatar.id, avatarData.findIndex(a => a.id === avatar.id))}
            >
              <div
                className="progress-line"
                style={{
                  width: `${progressWidth[avatar.id] || 0}%`,
                  animation: activeTab === avatar.id
                    ? '5s linear 0s 1 normal forwards running progressAnimation'
                    : 'auto ease 0s 1 normal none running none'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection4;
