// LenisWrapper.jsx
import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';

const LenisWrapper = ({ children }) => {
  const lenisRef = useRef(null);
  const location = useLocation();
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothTouch: false,
      wheelMultiplier: 1.0, // Default value for better scrolling response
      lerp: 0.1, // Adjusting the lerp for smoother scrolling
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Add a global method to stop scrolling during animations
    window.lenisScroll = {
      stop: () => lenis.stop(),
      start: () => lenis.start(),
      scrollTo: (target, options) => lenis.scrollTo(target, options),
      reset: () => {
        // Force a recalculation of Lenis
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

  // Reset scroll position on route change
  useEffect(() => {
    if (lenisRef.current) {
      // Give a slight delay to ensure DOM is updated
      setTimeout(() => {
        lenisRef.current.scrollTo(0, { immediate: true });
        lenisRef.current.resize(); // Force resize to update internal values
        
        // Force a small scroll to trigger recalculation
        setTimeout(() => {
          window.scrollTo(0, 1);
          window.scrollTo(0, 0);
          
          // Ensure Lenis is running
          if (lenisRef.current) {
            lenisRef.current.start();
          }
        }, 50);
      }, 100);
    }
  }, [location.pathname]);
  
  // Fix for potential scroll issues after refresh
  useEffect(() => {
    if (isInitialized && lenisRef.current) {
      // Reset Lenis periodically to fix any potential issues
      const resetInterval = setInterval(() => {
        if (lenisRef.current) {
          lenisRef.current.resize();
          lenisRef.current.start();
        }
      }, 5000);
      
      // Also reset on window resize
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

  return (
    <div data-lenis-scroll>
      {children}
    </div>
  );
};

export default LenisWrapper;
