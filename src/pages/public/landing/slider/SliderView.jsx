import React from "react";
import { observer } from "mobx-react";
import sliderStore from "./SliderStore";

const SliderView = observer(() => {
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade">
      <div className="carousel-inner">
        {sliderStore.images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === sliderStore.currentIndex && "active"}`}
          >
            <img src={image} className="d-block" alt='' />
          </div>
        ))}
      </div>   
      
    </div>
  );
});

export default SliderView;
