import React from "react";
import laptop from "../../../../assets/img/laptop.png";
import Slider from "../slider/Slider";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";

function Home() {
  return (
    <div className="main">
      <div className="home__main">
        <div className="info">
          <Typography variant="h1" gutterBottom>
            New broadcast channel for students for Tel-Ran school
          </Typography>

          <Typography variant="h3" gutterBottom>
            A New Way For Creators to Deepen Connections With Followers
          </Typography>

          <NavLink to="/signup">
            <Button variant="contained">Get started now</Button>
          </NavLink>
        </div>
        <div className="info__slider">
          <Slider />
          <img className="laptop" src={laptop} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;
