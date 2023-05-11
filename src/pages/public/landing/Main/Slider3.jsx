import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import developers from "../../../../assets/img/developers.png";
import alina      from "../../../../assets/img/alina.png"
import volodymyr  from "../../../../assets/img/volodymyr.png"
import nazar      from "../../../../assets/img/nazar.png"
import gegham     from "../../../../assets/img/gegham.png"
import alex       from "../../../../assets/img/alex.png"
import vlad       from "../../../../assets/img/vlad.png"

const slides = [
    {
      title: 'Alina Muzicuka',
      description: "I am 27 years old and I'm from Riga. In the past, I worked as an optician and also have good sales experience. By education, I am an interior designer and have an unfinished higher education degree in Business Psychology.",
      url: alina,
      link: "https://www.linkedin.com/in/alina-muzicuka"
    },
    {
      title: 'Nazar Dosmukhambetov',
      description: 'I am currently 18 years old and I started my IT education when I was 17. I am from Mykolaiv, Ukraine and I am studying DevOps at the first year of university. However, everything you see on the screen I learned thanks to the Tel-Ran School.',
      url: nazar,
      link: "https://www.linkedin.com/in/nazar-dosmukhambetov-1b1a56275/"
    },
    {
        title: 'Volodymyr Ziubrytskiy',
        description: "I am 24 years old and I've got bachelor degree in marine education as Electrical Technical Officer. And successfully worked on board the vessel. But it's not good fit with family, so I decided to completely change my life",
        url: volodymyr,
        link: "https://www.linkedin.com/in/volodymyr-ziubrytskyi/"
    },
    {
        title: 'Alexander Nosov',
        description: 'I am 37 years old and live in sunny Turkey. I switched to IT after 12 years of active work in civil and industrial construction projects as a civil engineer. I obtained a degree in "Construction of Motorways" from a technical university.',
        url: alex,
        link: "https://www.linkedin.com/in/aleksandr-nosov"
    },
    {
        title: 'Vladyslav Sizov',
        description: "I am 40 years old, living in Berli. I have 10 years of successful experience in business automation, marketing, sales, event and project management. I hold a bachelor's degree in Business Management. Сurrently I volunteering at an IT school in Berlin.",
        url: vlad,
        link: ""
    },
    {
        title: 'Gegham Barsegyan',
        description: "Hi, my name is Gegham, and I am the instructor of the frontend group at Telran School. I am pleased to report that the students have a strong grasp of the world of JavaScript programming. Their outstanding results demonstrate their knowledge and ability, and I am confident that they have a bright future ahead of them. I would like to extend my congratulations to students for their achievements in this course and wish them continued success in their future endeavors.",
        url: gegham,
        link: "https://www.linkedin.com/in/g-barseghyan/"
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
                    <a href={slides.link} className="blog-slider__button animate-on-scroll" style={{ animationDelay: '0.6s' }}>
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
