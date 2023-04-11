import React, { useEffect } from "react";
import video from "../assets/video/BgSign.mp4";

function BgSign() {
  useEffect(() => {
    document.body.style.backgroundColor = "rgb(63, 120, 209)";
  }, []);
  
  return (
    <div className="bg-video">
      <video autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}

export default BgSign;