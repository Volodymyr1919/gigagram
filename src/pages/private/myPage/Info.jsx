import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BsPlusSquareFill } from "react-icons/bs";
import ModalWindow from "../../partial/ModalWindow";
import UserInfoStore from "../../../stores/privateStores/UserInfoStore";
import { observer } from "mobx-react";
// eslint-disable-next-line no-unused-vars
import styles from "./scss/info.scss";

const Info = observer(() => {
  const handleClick = () => {
    UserInfoStore.setShow(false);
  };

  let posts_length = localStorage.getItem("posts_length");

  useEffect(() => {
    UserInfoStore.getMe();
    UserInfoStore.getFollowers();
    UserInfoStore.getFollowings();
  }, []);

  return (
    <div className="profile_info">
      <div className="info-container">
        <div className="title_header">
          <div className="profile-picture">
            <img src={UserInfoStore.avatar} alt="Profile avatar" />
          </div>
          <div className="user_title">
            <p>{UserInfoStore.fullname}</p>
            <p>@{UserInfoStore.username}</p>
          </div>
        </div>

        <div className="profile-info">
          <p>{UserInfoStore.bio}</p>
          <div className="profile-counts">
            <div className="count_block">
              <span className="count">{posts_length}</span>
              <span className="stat">Публикаций</span>
            </div>
            <div className="count_block">
              <NavLink to="/followers">
                <span className="count">{UserInfoStore.followers}</span>
                <span className="stat">Подписчиков</span>
              </NavLink>
            </div>
            <div className="count_block">
              <span className="count">{UserInfoStore.followings}</span>
              <span className="stat">Подписок</span>
            </div>
          </div>
        </div>
      </div>
      <div className="edit">
        <button className="edit-profile">Отредактировать</button>
        <button
          className="button_create"
          onClick={() => UserInfoStore.setShow(true)}
        >
          <BsPlusSquareFill />
        </button>
        <ModalWindow
          isShow={UserInfoStore.isShow}
          setShow={UserInfoStore.setShow}
          onClose={handleClick}
        />
      </div>
    </div>
  );
});

export default Info;
