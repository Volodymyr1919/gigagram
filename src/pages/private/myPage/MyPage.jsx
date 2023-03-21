import React from "react";
import ProfileInfo from "./ProfileInfo";
import ProfilePosts from "./ProfilePosts";
import Header from "./Header/Header"
export default function MyPage () {
  return (
    
      <div className="profile-container">
      <Header />
      <ProfileInfo />     
      <ProfilePosts />
      </div>

  )
}