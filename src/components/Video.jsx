import React, { useEffect, useRef } from "react";
import "./Video.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Video = () => {
  const videoRef = useRef(null);

  useGSAP(() => {
    gsap.to(videoRef.current, {
      bottom: "3vh",
      duration: 1.5,
      ease: "expo.inOut",
    });
  }, []);

  useEffect(() => {
  
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 1500);
    return () => clearTimeout(timer); // Clean up the timeout
  }, []);

  return (
    <div className="video-container">
      <div className="video-layer"></div>
      <video
        ref={videoRef}
        width="100%"
        loop
        muted
        src="https://www.mivi.in/cdn/shop/videos/c/vp/01eb3a9ba85b4a74a7aaef16b765376a/01eb3a9ba85b4a74a7aaef16b765376a.SD-480p-1.5Mbps-50069298.mp4?v=0"
      ></video>
    </div>
  );
};

export default Video;
