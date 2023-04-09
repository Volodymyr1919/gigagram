import React from "react";
import Info from "./Info";
import Posts from "./Posts";

export default function MyPage() {
  return (
    <div className="body_myPage">
      <div className="profile-container">
        <Info />
        {/* <Posts /> */}
      </div>
    </div>
  );
}
