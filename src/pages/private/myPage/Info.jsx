import React, { useEffect, useState } from "react";
import { BsPlusSquareFill } from "react-icons/bs";
import ModalWindow from "../../partial/ModalWindow";
import { observer } from "mobx-react";
import Followers from "../followers/FollowersView";
import Followings from "../followings/FollowingsView";
// eslint-disable-next-line no-unused-vars
import styles from "./scss/info.scss";
import EditModal from "../../partial/EditModal";
import { useStores } from "../../../stores/MainStore";
import ProfilePosts from "./Posts";

const Info = observer(() => {

  const { UserInfoStore, UserPostsStore, RequestsStore, ConfigStore } = useStores();

  const [me, setMe] = useState([]);

  useEffect(() => {
    new Promise((resolve, rejects) => {
      resolve();
    })
    .then(() => {
      return RequestsStore.doGet(ConfigStore.url + "/me");
    })
    .then((myInfo) => {
      setMe(myInfo);
    })
    // async function loadData() {
    //   try {
    //     await UserInfoStore.getMe();
    //     console.log("info await", UserInfoStore.username);
    //     await UserInfoStore.getFollowers(UserInfoStore.username);
    //     await UserInfoStore.getFollowings(UserInfoStore.username);
    //   } catch (error) {
    //     UserInfoStore.setErr(error.message);
    //     UserInfoStore.setShow(true);
    //   }
    // }
    // loadData();
  }, []);

  return (
    <div className="profile_info">
      
      <div className="info-container">
        <div className="title_header">
          <div className="profile-picture">
            <img src={me.avatar} alt="Profile avatar" />
          </div>
          <div className="user_title">
            <p>{me.fullname}</p>
            <p>@{me.username}</p>
          </div>
        </div>

        <div className="profile-info">
          <p>{me.bio}</p>
          <div className="profile-counts">
            <div className="count_block-posts">
              <span className="count">{me.posts_count}</span>
              <span className="stat">Публикаций</span>
            </div>
            <div className="count_block">
              <button onClick={() => ConfigStore.setIsShowFollowers(true)}>{me.followers} Подписчиков</button>
              <Followers username={me.username} />
            </div>
            <div className="count_block">
              <button onClick={() => ConfigStore.setIsShowFollowings(true)}>{me.following} Подписок</button>
              <Followings username={me.username} />
            </div>
          </div>
        </div>
      </div>
       <div className="edit">
        <button
          className="edit-profile"
          onClick={() => ConfigStore.setIsShowEditModal(true)}
        >
          Отредактировать
        </button>
        <span
          className="button_create"
          onClick={() => ConfigStore.setIsShowModalWindow(true)}
        >
          <BsPlusSquareFill className="add_button" />
        </span>
        <EditModal />
        <ModalWindow />
      </div> 
      <ProfilePosts myId={me._id}/>
    </div>
  );
});

export default Info;
