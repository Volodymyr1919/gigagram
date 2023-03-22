import React from "react";
import Header from "./header/Header";
import Info from "./profile/Info";
import Posts from "./profile/Posts";

export default function MyPage() {
    return(
        <div className="profile-container">
            <Header />
            <Info />     
            <Posts />
      </div>
    );
}