import React, { useEffect, useRef } from "react";
import "./Video.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Video = () => {
  const desktopVideoRef = useRef(null);
  const mobileVideoRef = useRef(null);

  useGSAP(() => {
    gsap.to(desktopVideoRef.current, {
      bottom: "3vh",
      duration: 1.5,
      ease: "expo.inOut",
    });
    gsap.to(mobileVideoRef.current, {
      bottom: "3vh",
      duration: 1.5,
      ease: "expo.inOut",
    });
  }, []);

  useEffect(() => {
    const playVideos = () => {
      if (desktopVideoRef.current) {
        desktopVideoRef.current.play();
      }
      if (mobileVideoRef.current) {
        mobileVideoRef.current.play();
      }
    };   
    
    const timer = setTimeout(playVideos, 1500);
    return () => clearTimeout(timer); // Clean up the timeout
  }, []);

  return (
    <div className="video-container">
      <div className="video-layer"></div>
      <video
        className="desktop-screen"
        ref={desktopVideoRef}
        width="100%"
        loop
        muted
        src="https://www.mivi.in/cdn/shop/videos/c/vp/01eb3a9ba85b4a74a7aaef16b765376a/01eb3a9ba85b4a74a7aaef16b765376a.SD-480p-1.5Mbps-50069298.mp4?v=0"
      ></video>
      <video
        className="mobile-screen"
        ref={mobileVideoRef}
        width="100%"
        loop
        muted
        src="https://www.mivi.in/cdn/shop/videos/c/vp/56ac747b94394a31b2227e778fba79a1/56ac747b94394a31b2227e778fba79a1.HD-720p-4.5Mbps-50078624.mp4?v=0"
      ></video>
    </div>
  );
};

export default Video;
