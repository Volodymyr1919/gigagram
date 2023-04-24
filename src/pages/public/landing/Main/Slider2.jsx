import React, { useState }    from 'react';
import { Carousel }           from 'react-bootstrap';
import Typography             from "@mui/material/Typography";

export default function Slider2() {
  const slides1 = [
    {
      title: 'Название изображения 1',
      description: 'Описание изображения 1',
      url:
        'https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2023/Products/911-Carrera-GTS-30-Years-Porsche-Thailand-Edition/M12_Thai30Y_HIGH_RES.jpg/jcr:content/M12_Thai30Y_HIGH_RES.jpg',
    },
    {
      title: 'Название изображения 2',
      description: 'Описание изображения 2',
      url:
        'https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/teaser_720x406x2/dam/pnr/2023/Products/911-Carrera-GTS-30-Years-Porsche-Thailand-Edition/Galerie-2/M07_Thai30Y_HIGH_RES.jpg/jcr:content/M07_Thai30Y_HIGH_RES.jpg',
    },
  ];

 


  return (
    
     <Carousel fade className='slider' >
      {slides1.map((slide, index) => (
        <Carousel.Item key={index}>
          <div className="third__block">
            <div className="block__info">
              <Typography variant="h2" gutterBottom className="animate-on-scroll" style={{ animationDelay: '0.5s' }}>
                {slide.title}
              </Typography>
              <p className="animate-on-scroll" style={{ animationDelay: '1s' }}>
                {slide.description}
              </p>
            </div>
            <div className="block__img">
              <img src={slide.url} alt={slide.title} />
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>

  );
}
