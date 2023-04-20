import React from "react";
import Footer from "../../partial/footer/Footer";
import Main from "./Main/Main"
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