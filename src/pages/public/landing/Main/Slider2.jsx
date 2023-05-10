import React, { useState } from 'react';
import { Carousel }           from 'react-bootstrap';
import Typography            from "@mui/material/Typography";

export default function Slider2() {
  const slides1 = [
    {
      title: 'How to upload an image?',
      link: 'https://imgbb.com/',
      description: "First, go to the link above where you will host your image. Repeat the actions in the video or follow the instructions. Click on the 'Start Uploading' button and upload the desired image. Once you get the link, copy it and paste it into your web browser. You will be redirected to a page with the photo. Right-click on the image and select 'Copy Image Address'. You're done! You can now use this link to upload the photo to our social network. ",
      second_description: "If you want to see how to host videos, go to the next slide by clicking on the buttons below.",
      url:
        'https://ik.imagekit.io/rhwh9nfxa/Untitled__1_.mp4?updatedAt=1683151009879',
    },
    {
      title: 'How to upload video?',
      link: 'https://imagekit.io/',
      description: "First, go to the link above where you will host your video. Repeat the actions in the video or follow the instructions. After logging in to the website, you will be redirected to the main page. Then click on the 'Media library' in the sidebar and start uploading your video by clicking the 'New' button in the upper-right corner. You will be redirected to a page with the video. Right-click on the video and select 'Copy Video Address'. Good job! You can now use this link to upload the video to our social network.",
      url:
        'https://ik.imagekit.io/rhwh9nfxa/PostVideo.mp4?updatedAt=1683503000646',
    },
  ];

  return (
    <Carousel fade className='slider' interval={null} >
      {slides1.map((slide, index) => (
        <Carousel.Item key={index}>
          <div className="third__block">
            <div className="block__info">
              <Typography variant="h2" gutterBottom className="animate-on-scroll" style={{ animationDelay: '0s' }}>
                {slide.title}
              </Typography>
              <a href={slide.link} style={{cursor: 'pointer', color: 'dodgerblue'}} >{slide.link}</a>
              <p className="animate-on-scroll" style={{ animationDelay: '0.3s' }}>
                {slide.description}
              </p>
              <p className="animate-on-scroll" style={{ animationDelay: '0.6s', color: '#F8B819' }}>{slide.second_description}</p>
            </div>
            <div className="block__img">
              <video controls src={slide.url} alt={slide.title} />
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

