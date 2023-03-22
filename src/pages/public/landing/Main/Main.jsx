import React from "react";
import laptop from "../../../../assets/img/laptop.png";
import SliderView from "../slider/SliderView";

function Home() {
  return (
    
    <div className="main">
      <div className="home__main">
        <div className="info">
          <h1>Gigagram - social network special for Tel-Ran</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
            exercitationem.
          </p>
          <h3>created by group Gigacom</h3>
          <button>some some</button>
        </div>
        <div className="info__slider">
            <SliderView />
          <img className="laptop" src={laptop} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;
