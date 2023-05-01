import React, { useEffect, useState } from "react";
import { useParams }                  from "react-router-dom";
import { observer }                   from "mobx-react";
import Followers                      from "../followers/FollowersView";
import Followings                     from "../followings/FollowingsView";
import Footer                         from "../../partial/footer/Footer";
import styles                         from "../myPage/scss/myPage.scss";
import { useStores }                  from "../../../stores/MainStore";
import ProfilePosts                   from "./UserPosts";
import Loading                        from "../../partial/Loading";
import Success                        from "../../partial/Success";
import { useNavigate } from "react-router-dom";
import deletedUser from "../../../assets/img/deletedUser.png";
import { Avatar } from "@mui/material";

const UserPage = observer(() => {

  const { username } = useParams();

  const { RequestsStore, ConfigStore } = useStores();

  const [me, setMe] = useState([]);
  const [isFollow, setIsFollow] = useState("Follow");

  const navigate = useNavigate();

  useEffect(() => {
    new Promise((resolve, rejects) => {
      resolve();
    })
    .then(() => {
      if (username === ConfigStore.me.username) {
        navigate("/my-page");
      } else {
        return RequestsStore.doGet(ConfigStore.url + "/user/" + username);
      }
    })
    .then((myInfo) => {
      switch (myInfo) {
        case "Forbidden":
          ConfigStore.setErr("Token has been burned");
          ConfigStore.setIsShow(true);
          break;
        case "Not Found":
          setMe("deleted");
          ConfigStore.setLoading(false);
          break;
        default:
          setMe(myInfo);
          ConfigStore.setLoading(false);
          break;
      }
    })
    .then(() => {
      return RequestsStore.doGet(ConfigStore.url + "/followings/" + ConfigStore.me.username)
    })
    .then((resp) => {
      switch (resp) {
        case "Forbidden":
          ConfigStore.setErr("Token has been burned");
          ConfigStore.setIsShow(true);
          break;
        case null:
          return;
        default:
          ConfigStore.setFollowings(resp.following);
          break;
      }
    })
  }, [ConfigStore.updateMe, ConfigStore.loading, username, isFollow]);

  useEffect(() => {
    if (ConfigStore.followings) {
      ConfigStore.followings.find((user) => user.username === me.username) ? setIsFollow("Unfollow") : setIsFollow("Follow") 
    } else {
      return;
    }
  },[ConfigStore.followings, me.username, isFollow]);

  const follow = (_switch) => {
    switch (_switch) {
      case "Follow":
        RequestsStore.doPost(ConfigStore.url + "/follow", {
          username: username
        })
        .then((response) => {
          if (response.status === "OK") {
            setIsFollow("Unfollow");
            ConfigStore.setSnackSeverity("success");
            ConfigStore.setSnackText("Subscribed!");
            ConfigStore.setIsShowSnack(true);
          } else {
            ConfigStore.setSnackSeverity("error");
            ConfigStore.setSnackText("Some error ocured :(");
            ConfigStore.setIsShowSnack(true);
          }
        });
        break;
      case "Unfollow":
        RequestsStore.doPost(ConfigStore.url + "/unfollow", {
          username: username
        })
        .then((response) => {
          if (response.status === "OK") {
            setIsFollow("Follow");
            ConfigStore.setSnackSeverity("success");
            ConfigStore.setSnackText("Unsubscribed!");
            ConfigStore.setIsShowSnack(true);
          } else {
            ConfigStore.setSnackSeverity("error");
            ConfigStore.setSnackText("Some error ocured :(");
            ConfigStore.setIsShowSnack(true);
          }
        });
        break;
      default:
        break;
    }
  };

  return (
    <>  
    {ConfigStore.loading ? <Loading /> : 
      <div className="body_myPage">
        <div className="profile-container">
          <div className="profile_info">
            
            <div className="info-container">
              <div className="title_header">
                <div className="profile-picture">
                  <Avatar src={me !== "deleted" ? me.avatar : deletedUser} alt="Profile avatar" className="picture__avatar"/>
                </div>
                <div className="user_title">
                  <p>{me.fullName}</p>
                  <p>{me !== "deleted" ? me.username : "Account deleted"}</p>
                </div>
              </div>

              <div className="profile-info">
                <p>{me !== "deleted" ? me.bio : "This account has been deleted by owner"}</p>
                <div
                  className="profile-counts"
                  style={me !== "deleted" ? {display: "flex"} : {display: "none"}}>
                  <div className="count_block-posts">
                    <span className="count">{me.posts_count}</span>
                    <span className="stat">Posts</span>
                  </div>
                  <div className="count_block">
                    <span onClick={() => ConfigStore.setIsShowFollowers(true)}>{me.followers} Followers</span>
                    <Followers username={me.username} />
                  </div>
                  <div className="count_block">
                    <span onClick={() => ConfigStore.setIsShowFollowings(true)}>{me.following} Followings</span>
                    <Followings username={me.username} />
                  </div>
                </div>
              </div>
            </div>
            <div className="edit" style={me !== "deleted" ? {display: "block"} : {display: "none"}}>
              <button
                className="edit-profile"
                onClick={() => follow(isFollow)}
              >
                {isFollow}
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