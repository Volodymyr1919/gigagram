import React, { useEffect, useState } from "react";
import styles from './scss/userInfoTest.scss';

function ProfileInfo(props) {
  const [followers, setFollowers] = useState();
  const [followings, setFollowings] = useState();
  const [fullname, setFullname] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");


  let posts_length = localStorage.getItem("posts_length");

  useEffect(() => {
    function getMe() {
      fetch("http://65.109.13.139:9191/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setUsername(data.username)
          setBio(data.bio);
          setFullname(data.fullName);
          setAvatar(data.avatar);
        });
    }

    function getFollowers() {
      fetch("http://65.109.13.139:9191/followers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((data) => setFollowers(data.followers.length));
    }

    function getFollowings() {
      fetch("http://65.109.13.139:9191/followings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((data) => setFollowings(data.following.length));
    }
    getMe();
    getFollowings();
    getFollowers();
  }, []);
  return (
    <div className="profile_info">
    <div className="info-container">

      <div className="title_header">
          <div className="profile-picture">
            <img src={avatar} alt="Profile picture" />
          </div>
           <div className="user_title">
           <p>{fullname}</p>
           <p>@{username}</p>
          </div>
      </div>

      <div className="profile-info">
        <p>{bio}</p>
        <div className="profile-counts">
          
          <div className="count_block">
          <span className="count">{posts_length}</span>
            <span className="stat">Публикаций</span>
            
          </div>
          <div className="count_block">
          <span className="count">{followers}</span>
            <span className="stat">Подписчиков</span>
            
          </div>
          <div className="count_block">
          <span className="count">{followings}</span>
            <span className="stat">Подписок</span>
            
          </div>
        </div>
      </div>
      
    </div>
    <div className="edit">
    <button className="edit-profile">Отредактировать</button>
    </div>
  </div>
  );
}

export default ProfileInfo;
