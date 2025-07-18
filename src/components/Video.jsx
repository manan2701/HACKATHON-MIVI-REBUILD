import React from "react";
import "./Video.css";

const Video = () => {
 
  return (
    <div className="video-container">
      <div  className="video-layer">
      </div>
      <video
        width="100%"
        autoPlay
        loop
        muted
        src="https://www.mivi.in/cdn/shop/videos/c/vp/01eb3a9ba85b4a74a7aaef16b765376a/01eb3a9ba85b4a74a7aaef16b765376a.SD-480p-1.5Mbps-50069298.mp4?v=0"
      ></video>
    </div>
  );
};

export default Video;
