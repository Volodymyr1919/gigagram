import React, { useState } from 'react';
import { Carousel }           from 'react-bootstrap';
import Typography            from '@mui/material/Typography';
import gigacom               from '../../../../assets/img/gigacom.png'
export default function Slider1() {
  
  const slides1 = [
    {
      title: 'GIGAGRAM',
      description: "First, go to the link above where you will host your image. Repeat the actions in the video or follow the instructions. Click on the 'Start Uploading' button and upload the desired image. Once you get the link, copy it and paste it into your web browser. You will be redirected to a page with the photo. Right-click on the image and select 'Copy Image Address'. You're done! You can now use this link to upload the photo to our social network. ",
      second_description: "If you want to see how to host videos, go to the next slide by clicking on the buttons below.",
      url: gigacom,
    }
  ];

  return (
    <Carousel fade className='slider' interval={null} >
      {slides1.map((slide, index) => (
        <Carousel.Item key={index}>
          <div className="second__block">
            <div className="block__info">
              <Typography variant="h2" gutterBottom className="animate-on-scroll" style={{ animationDelay: '0s' }}>
                {slide.title}
              </Typography>
              <p className="animate-on-scroll" style={{ animationDelay: '0.3s' }}>
                {slide.description}
              </p>
              <p className="animate-on-scroll" style={{ animationDelay: '0.6s', color: '#F8B819' }}>{slide.second_description}</p>
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

