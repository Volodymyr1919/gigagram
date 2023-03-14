import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/public/home/Home";
import SignIn from "../pages/public/signin/SignIn";
import SignUp from "../pages/public/signup/SignUp";
import Forgot from "../pages/public/forgot/Forgot";
import Feed from "../pages/private/feed/Feed";
import UserProfile from "../pages/private/userProfile/UserProfile";
import MyProfile from "../pages/private/myProfile/MyProfile";
import Post from "../pages/private/post/Post";
import Followers from "../pages/private/followers/Followers";
import Followings from "../pages/private/followings/Followings";
import NotFound from "../pages/public/notFound/NotFound";

const publicRoutes = [
    {
      path: '/', 
      element: <Home />,
      title: "Home",
      iClass: "bi bi-house-fill"
    },
    {
      path: '/signup',
      element: <SignUp />,
      title: "Sign Up",
      iClass: "bi bi-tags-fill"
    },
    {
      path: '/signin',
      element: <SignIn />,
      title: "Sign In",
      iClass: "bi bi-folder-fill"
    },
    {
        path: '/forgot',
        element: <Forgot />,
        title: "Forgot",
        iClass: "bi bi-shield-fill-check"
    },
  ];
export {publicRoutes};

const privateRoutes = [
    {
      path: '/feed', 
      element: <Feed />,
      title: "Feed",
      iClass: "bi bi-house-fill"
    },
    {
      path: '/user-profile',
      element: <UserProfile />,
      title: "User Profile",
      iClass: "bi bi-tags-fill"
    },
    {
      path: '/post/:id',
      element: <Post />,
      title: "Post",
      iClass: "bi bi-folder-fill"
    },
    {
        path: '/my-profile',
        element: <MyProfile />,
        title: "My Profile",
        iClass: "bi bi-shield-fill-check"
    },
    {
        path: '/followers',
        element: <Followers />,
        title: "Followers",
        iClass: "bi bi-shield-fill-check"
    },
    {
        path: '/followings',
        element: <Followings />,
        title: "Followings",
        iClass: "bi bi-shield-fill-check"
    },
  ];
export {privateRoutes};

function MainRoutes() {
    return(
        <Routes animation='vertical-slide'>
            {publicRoutes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                />
                ))}
            <Route path="*" element={<NotFound />}/>
        </Routes>
    )
}

export default MainRoutes;