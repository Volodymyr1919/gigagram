import React, { useEffect, useState } from "react";
import { useParams }                  from "react-router-dom";
import { BsPlusSquareFill }           from "react-icons/bs";
import ModalWindow                    from "../../partial/ModalWindow";
import { observer }                   from "mobx-react";
import Followers                      from "../followers/FollowersView";
import Followings                     from "../followings/FollowingsView";
import Footer                         from "../../partial/footer/Footer";
import styles                         from "./scss/myPage.scss";
import EditModal from "../../partial/EditModal";
import { useStores } from "../../../stores/MainStore";
import ProfilePosts from "./UserPosts";
import Loading from "../../partial/Loading";

const UserPage = observer(() => {

  const { username } = useParams();

  const { RequestsStore, ConfigStore } = useStores();

  const [me, setMe] = useState([]);



  useEffect(() => {
    new Promise((resolve, rejects) => {
      resolve();
    })
    .then(() => {
      return RequestsStore.doGet(ConfigStore.url + "/user/" + username);
    })
    .then((myInfo) => {
      setMe(myInfo);
      ConfigStore.setUpdateMe(false);
      ConfigStore.setLoading(false);
    })
  }, [ConfigStore.updateMe, ConfigStore.loading ]);

  return (
    <>  
    {ConfigStore.loading ? <Loading /> : 
      <div className="body_myPage">
        <div className="profile-container">
          <div className="profile_info">
            
            <div className="info-container">
              <div className="title_header">
                <div className="profile-picture">
                  <img src={me.avatar} alt="Profile avatar" />
                </div>
                <div className="user_title">
                  <p>{me.fullName}</p>
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
                    <span onClick={() => ConfigStore.setIsShowFollowers(true)}>{me.followers} Подписчиков</span>
                    <Followers username={me.username} />
                  </div>
                  <div className="count_block">
                    <span onClick={() => ConfigStore.setIsShowFollowings(true)}>{me.following} Подписок</span>
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
              <EditModal me={me}  />
              <ModalWindow />
            </div> 
          </div>
          <div className="posts_block">
            <ProfilePosts myId={me._id} />
          </div>
        </div>
        <Footer />
      </div>
    }
  </>
  );
});

export default UserPage;