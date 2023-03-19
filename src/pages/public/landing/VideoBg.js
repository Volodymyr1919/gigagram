import React from "react";
// import videoBg from "../../../assets/video/german-flag-16985.mp4";
// eslint-disable-next-line no-unused-vars
import videobg from "./videoBg.scss";

export default function VideoBg() {
    return(
        <video autoPlay muted loop id="myVideo">
            {/* <source src={videoBg} type="video/mp4" /> */}
        </video>
    );
}