import React, { useEffect, useState } from "react";
import { BsPlusSquareFill } from "react-icons/bs";
import ModalWindow from "../../partial/ModalWindow";
import UserInfoStore from "../../../stores/privateStores/myPageStores/UserInfoStore";
import { observer } from "mobx-react";
import Followers from "../followers/FollowersView";
import FollowingsView from "../followings/FollowingsView";
// eslint-disable-next-line no-unused-vars
import styles from "./scss/info.scss";
import UserPostsStore from "../../../stores/privateStores/myPageStores/UserPostsStore";
import EditModal from "../../partial/EditModal";

const Info = observer(() => {

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);

  const handleClick = () => {
    UserInfoStore.setShow(false);
  };
  const handleEdit = () => {
    UserInfoStore.setEditShow(false);
  };

  const handleClickFollower = () => {
    setShowFollowers(false);
  };

  const handleClickFollowings = () => {
    setShowFollowings(false);
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
              <button onClick={() => setShowFollowers(true)}>{UserInfoStore.followers} Подписчиков</button>
              <Followers showFollowers={showFollowers} setShowFollowers={setShowFollowers} onClose={handleClickFollower} />
            </div>
            <div className="count_block">
              <button onClick={() => setShowFollowings(true)}>{UserInfoStore.followings} Подписок</button>
              <FollowingsView showFollowings={showFollowings} setShowFollowings={setShowFollowings} onClose={handleClickFollowings} />
            </div>
          </div>
        </div>
      </div>
      <div className="edit">
        <button
          className="edit-profile"
          onClick={() => UserInfoStore.setEditShow(true)}
        >
          Отредактировать
        </button>
        <span
          className="button_create"
          onClick={() => UserInfoStore.setShow(true)}
        >
          <BsPlusSquareFill className="add_button" />
        </span>
        <EditModal
          isShow={UserInfoStore.editShow}
          setShow={UserInfoStore.setEditShow}
          onClose={handleEdit}
        />
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
