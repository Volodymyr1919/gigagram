import React, { useState } from 'react';
import { Carousel }           from 'react-bootstrap';
import Typography            from "@mui/material/Typography";

export default function Slider1() {
  const slides1 = [
    {
      title: 'Название изображения 1',
      description: 'Описание изображения 1',
      url:
        'https://tyyliniekka.fi/wp-content/uploads/2021/06/Porsche-1068x601.jpeg',
    },
    {
      title: 'Название изображения 2',
      description: 'Описание изображения 2',
      url:
        'https://cdn.motor1.com/images/mgl/Kbbj1A/s1/porsche-tequipment-roof-tent.jpg',
    },
  ];

  return (
    <Carousel fade className='slider' interval={null} >
      {slides1.map((slide, index) => (
        <Carousel.Item key={index}>
          <div className="second__block">
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

