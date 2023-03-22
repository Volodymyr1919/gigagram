import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BsPlusSquareFill } from 'react-icons/bs';
import ModalWindow from "../../../partial/ModalWindow";
// eslint-disable-next-line no-unused-vars
import styles from './scss/info.scss';

function Info(props) {
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
        .then((response) => {
          return response.json()
        })
        .then((data) => {
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
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          setFollowers(data.followers.length)
        });
    }

    function getFollowings() {
      fetch("http://65.109.13.139:9191/followings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          setFollowings(data.following.length)
        });
    }
    getMe();
    getFollowings();
    getFollowers();
  }, []);

  const [modalIsOpen, setmodalIsOpen] = useState(false);

  const handleClick = e => {setmodalIsOpen(true); console.log(modalIsOpen)};

  return (
    <div className="profile_info">
    <div className="info-container">

      <div className="title_header">
          <div className="profile-picture">
            <img src={avatar} alt="Profile avatar" />
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
          <NavLink to="/followers">
            <span className="count">{followers}</span>
            <span className="stat">Подписчиков</span>
          </NavLink>
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
      <button className='button_create' onClick={(e) => {handleClick(e)}}><BsPlusSquareFill/></button>
      <ModalWindow isShow={modalIsOpen}/>
    </div>
  </div>
  );
}

export default Info;