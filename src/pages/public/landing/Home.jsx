import React from "react";
import Footer from "./footer/Footer";
import Main from "./Main/Main"
// eslint-disable-next-line no-unused-vars
import homeStyle from './scss/home.scss'


function Home() {
  return (
    <div className="home">
        <Main />
        <Footer />
    </div>
  );
}

export default Home;