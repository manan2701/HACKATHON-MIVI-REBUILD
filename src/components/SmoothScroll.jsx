import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

const SmoothScroll = ({ children }) => {
  const scrollRef = useRef(null);
  const locoInstance = useRef(null);
  const location = useLocation();
  useEffect(() => {
    if (!scrollRef.current) return;

    locoInstance.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      lerp: 0.1,
      class: "is-inview",
    });

    setTimeout(() => {
      locoInstance.current.update();
    }, 100);

    return () => {
      locoInstance.current?.destroy();
    };
  }, []);

  // ✅ Update Locomotive on route change
  useEffect(() => {
    // Scroll to top
    locoInstance.current?.scrollTo(0, { duration: 0 });

    // Update layout
    setTimeout(() => {
      locoInstance.current?.update();
    }, 100);
  }, [location.pathname]);

  return (
    <div data-scroll-container ref={scrollRef}>
      {children}
    </div>
  );
};

export default SmoothScroll;
