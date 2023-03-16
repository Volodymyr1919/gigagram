import React from "react";
import Home from "./pages/public/landing/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./pages/layouts/MainLayout";
import LayoutNF from "./pages/layouts/LayoutNF";
import NotFound from "./pages/public/notFound/NotFound";
import Signin from "./pages/public/signin/Signin";
import SignUp from "./pages/public/signup/SignUp";


export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}/>
            <Route path="/signin" element={<Signin />}/>
            <Route path="/signup" element={<SignUp />}/>
          </Route>
          <Route element={<LayoutNF />}>
            <Route path="*" element={<NotFound />}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};