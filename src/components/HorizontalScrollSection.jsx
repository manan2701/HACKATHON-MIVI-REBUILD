import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HorizontalSection.css";
import { useGSAP } from "@gsap/react";
import { useSelector, useDispatch } from 'react-redux';
import { asyncaddToCart } from '../store/actions/userActions';
import LoadingSpinner from "./LoadingSpinner";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollSection = () => {
  const sectionRef = useRef(null);
  const horizontalRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const product = useSelector((state) => state.productReducer.products)
  const [loadingProductId, setLoadingProductId] = useState(null);
  const colors = [{
    color : "Black",
    image : "/assets/ai-buds-1.webp"
  },
  {
    color : "Silver",
    image : "/assets/ai-buds-2.webp"
  },
  {
    color : "Orange",
    image : "/assets/ai-buds-3.webp"
  },
  {
    color : "Champagne",
    image : "/assets/ai-buds-4.webp"
  }]

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

  const handleAddToCart = async (index) => {
    // Only proceed if user is logged in and products are loaded
    if (!user) {
      // Navigate to login or show notification
      alert('Please log in to add items to cart');
      return;
    }

    if (colors && product.length > 0) {
      // For simplicity, we'll use the first 4 products from the products array
      const productToAdd = colors[index];
      if (productToAdd) {
        // Use the first color option for the selected product
        const {color} = productToAdd;
        console.log(color);
        setLoadingProductId(product[0]?._id);
        await dispatch(asyncaddToCart(user, product[0], color));
        setLoadingProductId(null);
      }
    }
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
            <button 
              className="horizontal-add-to-cart"
              onClick={() => handleAddToCart(groupIndex)}
              disabled={loadingProductId === product[0]?._id}
            >
              {loadingProductId === product[0]?._id ? (
                <span>Adding...<span>  |  </span>₹6999</span>
              ) : (
                <span>ADD TO CART<span>  |  </span>₹6999</span>
              )}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
