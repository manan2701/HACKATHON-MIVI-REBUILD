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
        src="./src/assets/videon2.mp4"
      ></video>
    </div>
  );
};

export default Video;
