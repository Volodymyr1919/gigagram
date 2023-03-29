import React from "react";
import Home from "./pages/public/landing/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./pages/layouts/MainLayout";
import LayoutNF from "./pages/layouts/LayoutNF";
import NotFound from "./pages/public/notFound/NotFound";
import Signin from "./pages/public/signin/Signin";
import Signup from "./pages/public/signup/Signup";
import Followers from "./pages/private/followers/FollowersView";
import Feed from "./pages/private/feed/Feed";
import MyPage from "./pages/private/myPage/MyPage";
import PostId from "./pages/private/postId/PostId";
// eslint-disable-next-line no-unused-vars
import appStyle from "./scss/app.scss";


export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}/>
            <Route path="/signin" element={<Signin />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/followers" element={<Followers />}/>
            <Route path="/feed" element={<Feed />}/>
            <Route path="/my-page" element={<MyPage />}/>
            <Route path="/post/:id" element={<PostId />}/>
          </Route>
          <Route element={<LayoutNF />}>
            <Route path="*" element={<NotFound />}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};