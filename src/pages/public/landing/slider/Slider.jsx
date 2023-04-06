import React from "react";
import { observer } from "mobx-react";
// import sliderStore from "../../../../stores/publicStores/SliderStore"
import { useStores } from "../../../../stores/MainStore";

const Slider = observer(() => {

  const { SliderStore } = useStores();

  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade">
      <div className="carousel-inner">
        {SliderStore.images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === SliderStore.currentIndex && "active"}`}
          >
            <img src={image} className="d-block" alt='' />
          </div>
        ))}
      </div>   
      
    </div>
  );
});

export default Slider;
