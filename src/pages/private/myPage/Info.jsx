import React, { useEffect, useState } from "react";
import { BsPlusSquareFill } from "react-icons/bs";
import ModalWindow from "../../partial/ModalWindow";
import UserInfoStore from "../../../stores/privateStores/UserInfoStore";
import { observer } from "mobx-react";
import Followers from "../followers/FollowersView";
import styles from "./scss/info.scss";
import UserPostsStore from "../../../stores/privateStores/UserPostsStore";

const Info = observer(() => {
  const [showFollowers, setShowFollowers] = useState(false);

  const handleClick = () => {
    UserInfoStore.setShow(false);
  };

  const handleClickFollower = () => {
    setShowFollowers(false);
  };

  useEffect(() => {
    async function loadData() {
      try {
        await UserInfoStore.getMe(),
          UserInfoStore.getFollowers(),
          UserInfoStore.getFollowings();
      } catch (error) {
        UserInfoStore.setErr(error.message);
        UserInfoStore.setShow(true);
      }
    }
    loadData();
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
            <div className="count_block-posts">
              <span className="count">{UserPostsStore.posts_length}</span>
              <span className="stat">Публикаций</span>
            </div>
            <div className="count_block">
              <span onClick={() => setShowFollowers(true)}>
                {UserInfoStore.followers} Подписчиков
              </span>
              <Followers
                showFollowers={showFollowers}
                setShowFollowers={setShowFollowers}
                onClose={handleClickFollower}
              />
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
        <span
          className="button_create"
          onClick={() => UserInfoStore.setShow(true)}
        >
          <BsPlusSquareFill className="add_button" />
        </span>

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
