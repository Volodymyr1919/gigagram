import React, { useEffect, useState } from "react";
import { useParams }                  from "react-router-dom";
import { observer }                   from "mobx-react";
import Followers                      from "../followers/FollowersView";
import Followings                     from "../followings/FollowingsView";
import Footer                         from "../../partial/footer/Footer";
import styles                         from "./scss/myPage.scss";
import { useStores }                  from "../../../stores/MainStore";
import ProfilePosts                   from "./UserPosts";
import Loading                        from "../../partial/Loading";
import Success                        from "../../partial/Success";

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
      if (myInfo === "Forbidden") {
        ConfigStore.setErr("Token has been burned");
        ConfigStore.setIsShow(true);
      } else {
        setMe(myInfo);
        ConfigStore.setLoading(false);
      }
    })
  }, [ConfigStore.updateMe, ConfigStore.loading, username]);

  const follow = () => {
    RequestsStore.doPost(ConfigStore.url + "/follow", {
      username: username
    })
    .then((response) => {
      if (response.status === "OK") {
        ConfigStore.setSnackSeverity("success");
        ConfigStore.setSnackText("Subscribed!");
        ConfigStore.setIsShowSnack(true);
      } else {
        ConfigStore.setSnackSeverity("error");
        ConfigStore.setSnackText("You already Subscribed!");
        ConfigStore.setIsShowSnack(true);
      }
    });
  }

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
                    <span className="stat">Posts</span>
                  </div>
                  <div className="count_block">
                    <span onClick={() => ConfigStore.setIsShowFollowers(true)}>{me.followers}Followers</span>
                    <Followers username={me.username} />
                  </div>
                  <div className="count_block">
                    <span onClick={() => ConfigStore.setIsShowFollowings(true)}>{me.following}Followings</span>
                    <Followings username={me.username} />
                  </div>
                </div>
              </div>
            </div>
            <div className="edit">
              <button
                className="edit-profile"
                onClick={follow}
              >
                Follow
              </button>
            </div> 
          </div>
          <div className="posts_block">
            <ProfilePosts myId={me._id} />
          </div>
        </div>
        <Footer />
      </div>
    }
    <Success />
  </>
  );
});

export default UserPage;