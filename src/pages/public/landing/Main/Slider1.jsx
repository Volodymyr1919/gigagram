import React, { useState } from 'react';
import { Carousel }           from 'react-bootstrap';
import Typography            from '@mui/material/Typography';
import gigalogo               from '../../../../assets/img/gigacom.png'
export default function Slider1() {

  return (
    <Carousel fade className='slider' interval={null} >
        <Carousel.Item>
          <div className="second__block">
            <div className="block__info">
              <Typography variant="h2" gutterBottom className="animate-on-scroll" style={{ animationDelay: '0s' }}>
                INTRO
              </Typography>
              <p className="animate-on-scroll" style={{ animationDelay: '0.3s' }}>
              <b>Welcome to GIGAGRAM</b> - the ultimate social network created just for you! Whether you're a seasoned IT professional or just starting out, GIGAGRAM is the perfect platform to connect with like-minded individuals, expand your knowledge, and make valuable industry connections.
              </p>
              <p> Join our community and unlock a world of possibilities! Share your coding tips, project ideas, and even fun photos and videos related to IT. Customize your profile to showcase your skills. Ready to join us? Simply sign up with your email address and start exploring everything GIGAGRAM has to offer. Join a community of passionate individuals who share your love for technology and innovation, and take your IT journey to the next level with GIGAGRAM!
              </p>
            </div>
            <div className="block__img">
              <img src={gigalogo} alt=""/>
            </div>
          </div>
        </Carousel.Item>
    </Carousel>
  );
}

