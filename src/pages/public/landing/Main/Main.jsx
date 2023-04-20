import React, {useEffect}    from "react";
import laptop                from "../../../../assets/img/laptop.png";
import Slider                from "../slider/Slider";
import Button                from "@mui/material/Button";
import { NavLink }           from "react-router-dom";
import Typography            from "@mui/material/Typography";
import BgHome                from "../../../../backgrounds/BgHome";


function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    function animateOnScroll() {
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const rect = element.getBoundingClientRect();
    
        if (
          rect.top >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        ) {
          element.classList.add("is-visible");
        }
      }
    }
    
    animateOnScroll();
    
    window.addEventListener("scroll", animateOnScroll);
    
    return () => {
      window.removeEventListener("scroll", animateOnScroll);
    };
    }, []);
  return (
    <div className="main">

      <div className="first__block">
        <BgHome />
        <div className="home__main">
          <div className="info">

          <Typography variant="h1" gutterBottom className="welcome animate-on-scroll" style={{animationDelay: "0.5s"}}>
              Welcome to Gigagram !
          </Typography>

            <Typography variant="h2" gutterBottom className="animate-on-scroll" style={{animationDelay: "1.5s"}} >
              New broadcast channel for students of Tel-Ran school
            </Typography>

            <Typography variant="h3" gutterBottom className="animate-on-scroll" style={{animationDelay: "1.5s"}}>
              A New Way For Creators to Deepen Connections With Followers
            </Typography>

            <NavLink to="/signup">
              <Button variant="contained" className="animate-on-scroll" style={{animationDelay: "2.5s"}}>Get started now</Button>
            </NavLink>
          </div>
        </div>
      </div>

      <div className="second__block">

          <div className="block__info">
            <Typography variant="h2" gutterBottom className="animate-on-scroll" style={{animationDelay: "0.5s"}}>
              Why is Gigagram needed?
            </Typography>

            <p className="animate-on-scroll" style={{animationDelay: "1s"}}>
              You can use this web as a social network. Upload interesting code options, implementations, memes, and anything else that props into your head!
            </p>
          </div>

          <div className="block__img">
            <img src="https://images.ctfassets.net/az3stxsro5h5/PN5eYL4R5zinDWRiWAFOn/cfdea360c0d02e914926b9cda1b6b919/Jun16-This_Is_How_the_Instagram_Algorithm_Works-Horizontal.png?w=920&h=800&q=50&fm=png" alt="" />
          </div>

      </div>
      
      <div className="third__block">

      <div className="block__info">
            <Typography variant="h2" gutterBottom className="animate-on-scroll" style={{animationDelay: "0.5s"}}>
              Introduction
            </Typography>

            <p className="animate-on-scroll" style={{animationDelay: "1s"}}>
              After authorisation, you will be redirected to the feed page. There you can spand your time looking at all users posts
            </p>
      </div>

          <div className="block__img">
            <img src="https://i.ibb.co/Yc7Jw7m/Screenshot-2023-04-16-at-23-11-41.png" alt="" />
          </div>
      </div>
      
    

    </div>
  );
}

export default Home;
