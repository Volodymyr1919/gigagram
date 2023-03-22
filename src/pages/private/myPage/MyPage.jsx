import React from "react";
import Header from "./Header/Header";
import Info from "./ProfileInfo";
import Posts from "./ProfilePosts";

export default function MyPage() {
  return (
    <div className="profile-container">
      <Header />
      <Info />
      <Posts />
    </div>
  );
}
