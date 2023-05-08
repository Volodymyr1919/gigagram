import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import developers from "../../../../assets/img/developers.png";
import alina      from "../../../../assets/img/alina.png"
import volodymyr  from "../../../../assets/img/volodymyr.png"
import nazar      from "../../../../assets/img/nazar.png"
import gegham     from "../../../../assets/img/gegham.png"

const slides = [
    {
      title: 'Alina Muzicuka',
      description: "I am 27 years old and I'm from Riga. In the past, I worked as an optician and also have good sales experience. By education, I am an interior designer and have an unfinished higher education degree in Business Psychology.",
      url: alina,
    },
    {
      title: 'Nazar Dosmukhambetov',
      description: 'I am currently 18 years old and I started my IT education when I was 17. I am from Mykolaiv, Ukraine and I am studying DevOps at the first year of university. However, everything you see on the screen I learned thanks to the Tel-Ran School.',
      url: nazar,
    },
    {
        title: 'Volodymyr Ziubrytskiy',
        description: 'Описание изображения 1',
        url: volodymyr
    },
    {
        title: 'Alexander Nosov',
        description: 'Описание изображения 2',
        url:
          'https://i.pinimg.com/550x/b6/ac/7f/b6ac7f09eb1edcdcbd313d6a07746536.jpg',
    },
    {
        title: 'Vlad ...',
        description: 'Описание изображения 2',
        url:
          'https://i.pinimg.com/550x/b6/ac/7f/b6ac7f09eb1edcdcbd313d6a07746536.jpg',
    },
    {
        title: 'Gegham Barsegyan',
        description: 'Описание изображения 2',
        url: gegham,
    }
  ];

export default function Slider3() {
  return (
    <div className="last">
        <h1>About Developers</h1>
        <div className="last__block">
        <Carousel fade className='slider' interval={null} >
        {slides.map((slides, index) => (
            <Carousel.Item key={index}>
            <div className="block__info">
            <div className="dev__container">
            <div className="blog-slider">
                <div className="blog-slider__wrp swiper-wrapper">
                <div className="blog-slider__item swiper-slide">
                    <div className="blog-slider__img animate-on-scroll"  style={{ animationDelay: '0s' }}>
                    <img src={slides.url} alt={slides.title} />
                    </div>
                    <div className="blog-slider__content animate-on-scroll" style={{ animationDelay: '0s' }}>
                        <h2>{slides.title}</h2>
                    <div className="blog-slider__text animate-on-scroll" style={{ animationDelay: '0.3s' }}>
                        {slides.description}
                    </div>
                    <a href="#" className="blog-slider__button animate-on-scroll" style={{ animationDelay: '0.6s' }}>
                      TO MY LinkedIn
                    </a>
                    </div>
                </div>
                </div>
                <div className="blog-slider__pagination"></div>
            </div>
            </div>
        </div>
        </Carousel.Item>

        ))}
        </Carousel>
        <div className="block__img">
            <img controls src={developers} alt="" />
        </div>
        </div>
    </div>
  );
}
