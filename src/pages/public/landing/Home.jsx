import React from "react";
import Navigation from './navigation/NavigationView';
import Footer from "./footer/FooterView";
import Main from "./main/Main"

import homeStyle from './scss/home.scss'
function Home() {
  return (
    <div className="home">
        <Navigation />
        <Main />
        <Footer />
    </div>
  );
}

export default Home;