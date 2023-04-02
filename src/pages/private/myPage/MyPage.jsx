import React from "react";
import Header from "./header/Header";
import Info from "./Info";
import Posts from "./Posts";

export default function MyPage() {
  return (
    <div className="body_myPage">
      <div className="profile-container">
        {/* <Header /> */}
        <Info />
        <Posts />
      </div>
    </div>
  );
}
