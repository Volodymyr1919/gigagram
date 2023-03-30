import React from "react";
import Navigation from './navigation/NavigationView';
import Footer from "./footer/FooterView";
import Main from "./Main/Main"
// eslint-disable-next-line no-unused-vars
import homeStyle from './scss/home.scss'

function Home() {
  greet({ name: "amy" })
  return (
    <div className="home">
        <Navigation />
        <Main />
        <Footer />
    </div>
  );
}

export default Home;