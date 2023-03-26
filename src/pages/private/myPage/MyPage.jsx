import React from "react";
import Header from "./Header/Header";
import Info from "./Info";
import Posts from "./Posts";

export default function MyPage() {
  return (
    <div className="profile-container">
      <Header />
      <Info />
      <Posts />
    </div>
  );
}
