import React, { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HorizontalSection.css";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollSection = () => {
  const sectionRef = useRef(null);
  const horizontalRef = useRef(null);

  const imageURLs = [
    [1, 5, 9],
    [2, 6, 10],
    [3, 7, 11],
    [4, 8, 12],
  ];

  // 💡 Initialize selected images with first image in each group
  const [selectedImages, setSelectedImages] = useState(
    imageURLs.map((group) => group[0])
  );

  const handleSelectImage = (groupIndex, imageId) => {
    const updated = [...selectedImages];
    updated[groupIndex] = imageId;
    setSelectedImages(updated);
  };

  useLayoutEffect(() => {
    const elem = sectionRef.current;
    const scrollElem = horizontalRef.current;

    const totalWidth = scrollElem.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = totalWidth - viewportWidth;

    gsap.to(scrollElem, {
      x: () => `-${scrollDistance}`,
      ease: "none",
      scrollTrigger: {
        trigger: elem,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="horizontal-section" ref={sectionRef}>
      <div className="horizontal-section-content">
        <h1>Explore every detail</h1>
      </div>

      <div className="horizontal-scroll" ref={horizontalRef}>
        {imageURLs.map((group, groupIndex) => (
          <div key={groupIndex} className="image-card">
            <div className="select-image-menu">
              {group.map((imgId, i) => (
                <div key={i} className="image-wrapper">
                  <img
                  key={i}
                  src={`/assets/ai-buds-${imgId}.webp`}
                  alt={`Thumbnail ${imgId}`}
                  className={`thumbnail ${
                    selectedImages[groupIndex] === imgId ? "active" : ""
                  }`}
                  onClick={() => handleSelectImage(groupIndex, imgId)}
                />
                </div>
              ))}
            </div>
            <div className={`image-card-${groupIndex + 1} selected-image-wrapper`}>
              <img
                className="selected-image"
                src={`/assets/ai-buds-${selectedImages[groupIndex]}.webp`}
                alt={`Main ${selectedImages[groupIndex]}`}
              />
            </div>
            <button className="horizontal-add-to-cart">ADD TO CART<span>  |  </span>₹6999</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
