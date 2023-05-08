import React, { useEffect }  from "react";
import { observer }          from "mobx-react";
import Button                from "@mui/material/Button";
import { NavLink }           from "react-router-dom";
import Typography            from "@mui/material/Typography";
import BgHome                from "../../../../backgrounds/BgHome";
import Slider1               from "./Slider1";
import Slider2               from "./Slider2";
import Slider3               from "./Slider3";
import ExpandMoreIcon        from '@mui/icons-material/ExpandMore';


const Home = observer(() => {

  const handleScrollDownClick = () => {
    window.scrollBy({
      top: 900,
      behavior: "smooth",
    });
  };

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
              A New Way for Creators to Deepen Connections With Followers
            </Typography>

            <NavLink to="/signup">
              <Button variant="contained" className="animate-on-scroll" style={{animationDelay: "2.5s"}}>Get started now</Button>
            </NavLink>

            <span className="swipe" onClick={handleScrollDownClick} style={{cursor: "pointer"}}><ExpandMoreIcon /></span>
          </div>
        </div>
      </div>
      <Slider1 />
      <Slider2 />
      <Slider3 />
    </div>
  );
}
)
export default Home;
