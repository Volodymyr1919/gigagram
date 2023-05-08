import React, { useEffect } from "react";
import { BsPlusSquareFill }           from "react-icons/bs";
import ModalWindow                    from "../../partial/modal/ModalWindow";
import { observer }                   from "mobx-react";
import Followers                      from "../followers/FollowersView";
import Followings                     from "../followings/FollowingsView";
import Footer                         from "../../partial/footer/Footer"
import styles                         from "./scss/myPage.scss";
import EditModal                      from "../../partial/modal/EditModal";
import { useStores }                  from "../../../stores/MainStore";
import ProfilePosts                   from "./Posts";
import Loading                        from "../../partial/Loading";
import ErrorModal                     from "../../partial/modal/ErrorModal";
import { Avatar }                     from "@mui/material";
import Success                        from "../../partial/Success";         

const MyPage = observer(() => {

  const { RequestsStore, ConfigStore } = useStores();
  
  useEffect(() => {
    new Promise((resolve, rejects) => {
      resolve();
    })
    .then(() => {
      return RequestsStore.doGet(ConfigStore.url + "/me");
    })
    .then((myInfo) => {
      ConfigStore.setLoading(false);
      if (myInfo === "Forbidden") {
        ConfigStore.setErr("Token has been burned");
        ConfigStore.setIsShow(true);
      } else {
        ConfigStore.setMe(myInfo);
        ConfigStore.setUpdateMe(false); 
      }
    })
  }, [ConfigStore.updateMe, ConfigStore.loading, ConfigStore.updatePosts]);

  return (
    <>  
    {ConfigStore.loading ? <Loading /> : 
      <div className="body_myPage">
        <div className="profile-container">
          <div className="profile_info">
            
            <div className="info-container">
              <div className="title_header">
                <div className="profile-picture">
                  <Avatar src={ConfigStore.me.avatar} alt="Profile avatar" className="picture__avatar"/>
                </div>
                <div className="user_title">
                  <p>{ConfigStore.me.fullName}</p>
                  <p>{ConfigStore.me.username}</p>
                </div>
              </div>

              <div className="profile-info">
                <p>{ConfigStore.me.bio}</p>
                <div className="profile-counts" style={{display: "flex"}}>
                  <div className="count_block-posts">
                    <span className="count">{ConfigStore.me.posts_count}</span>
                    <span className="stat">Posts</span>
                  </div>
                  <div className="count_block">
                    <span onClick={() => ConfigStore.setIsShowFollowers(true)}>{ConfigStore.me.followers} Followers</span>
                    <Followers username={ConfigStore.me.username} />
                  </div>
                  <div className="count_block">
                    <span onClick={() => ConfigStore.setIsShowFollowings(true)}>{ConfigStore.me.following} Followings</span>
                    <Followings username={ConfigStore.me.username} />
                  </div>
                </div>
              </div>
            </div>
            <div className="edit">
              <button
                className="edit-profile"
                onClick={() => ConfigStore.setIsShowEditModal(true)}
              >
                Edit Profile
              </button>
              <span
                className="button_create"
                onClick={() => ConfigStore.setIsShowModalWindow(true)}
              >
                <BsPlusSquareFill className="add_button" />
              </span>
              <EditModal me={ConfigStore.me}  />
              <ModalWindow />
            </div> 
          </div>

          <div className="posts_block">
            <ProfilePosts myId={ConfigStore.me._id} />
          </div>

        </div>
        <Footer />
        <ErrorModal />
        <Success />
      </div>
    }
  </>
  );
});

export default MyPage;