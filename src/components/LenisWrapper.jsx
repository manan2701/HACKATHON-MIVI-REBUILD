import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';

// Lenis smooth scroll wrapper
const LenisWrapper = ({ children }) => {
  const lenisRef = useRef(null);
  const location = useLocation();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothTouch: false,
      wheelMultiplier: 1.0,
      lerp: 0.1,
    });
    lenisRef.current = lenis;
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);
    window.lenisScroll = {
      stop: () => lenis.stop(),
      start: () => lenis.start(),
      scrollTo: (target, options) => lenis.scrollTo(target, options),
      reset: () => {
        lenis.resize();
        lenis.start();
      }
    };
    setIsInitialized(true);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenisScroll = null;
      setIsInitialized(false);
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      setTimeout(() => {
        lenisRef.current.scrollTo(0, { immediate: true });
        lenisRef.current.resize();
        setTimeout(() => {
          window.scrollTo(0, 1);
          window.scrollTo(0, 0);
          if (lenisRef.current) {
            lenisRef.current.start();
          }
        }, 50);
      }, 100);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isInitialized && lenisRef.current) {
      const resetInterval = setInterval(() => {
        if (lenisRef.current) {
          lenisRef.current.resize();
          lenisRef.current.start();
        }
      }, 5000);
      const handleResize = () => {
        if (lenisRef.current) {
          lenisRef.current.resize();
          lenisRef.current.start();
        }
      };
      window.addEventListener('resize', handleResize);
      return () => {
        clearInterval(resetInterval);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isInitialized]);

  return <div data-lenis-scroll>{children}</div>;
};

export default LenisWrapper;
