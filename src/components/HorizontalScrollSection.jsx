import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HorizontalSection.css";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollSection = () => {
  const sectionRef = useRef(null);
  const horizontalRef = useRef(null);

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
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="horizontal-section" ref={sectionRef}>
      <div className="horizontal-scroll" ref={horizontalRef}>
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className={`image-card-${n} image-card`}>
            <img src={`/assets/ai-buds-${n}.webp`} alt={`Slide ${n}`} />
            <p>Mivi AI Buds {n}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
