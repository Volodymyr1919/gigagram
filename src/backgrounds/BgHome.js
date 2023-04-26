import React, { useEffect } from "react";
import video from "../assets/video/BgHome.mp4";

function BgHome() {
  useEffect(() => {
    document.body.style.backgroundColor = "rgb(63, 120, 209)";
  }, []);
  
  return (
    <div className="bg-video">
      <video autoPlay loop muted playsInline>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}

export default BgHome;
