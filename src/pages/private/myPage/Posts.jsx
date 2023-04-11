import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { observer } from "mobx-react";
import { useStores } from "../../../stores/MainStore";
import styles from "./scss/posts.scss";

const ProfilePosts = observer((props) => {

  const { RequestsStore, ConfigStore } = useStores();

  const { myId } = props;

  const [myPost, setMyPost] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if(myId !== undefined) {
      new Promise((resolve, rejects) => {
        resolve()
      })
      .then(() => {
        return RequestsStore.doGet(ConfigStore.url + "/posts?user_id=" + myId)
      })
      .then((myPosts) => {
        if(myPosts === "Forbidden") {
          ConfigStore.setErr("Token has been burned");
          ConfigStore.setIsShow(true);
        } else {
          setMyPost(myPosts)
        }
      })
    } else {
      return;
    }
  }, [myId]);

  return (
    <div className="posts_block">
      <div className="posts_container">
        {myPost === undefined ? (
          <h2 className="errorCase">Sorry any posts found</h2>
        ) : (
          myPost.map((item) => (
            <span
              style={{ cursor: "pointer" }}
              key={item._id}
              className=""
              onClick={() => navigate(`/post/${item._id}`)}
            >
              {item.image && item.video ? (
                <AliceCarousel
                  disableButtonsControls="true"
                  touchTracking="true"
                  touchMoveDefaultEvents="false"
                >
                  <span onClick={() => navigate(`/post/${item._id}`)}>
                    <img src={item.image} alt={item.image} className="post" />
                  </span>

                  <video autoPlay loop muted className="video">
                    <source src={item.video} />
                  </video>
                </AliceCarousel>
              ) : (
                <img src={item.image} alt="" className="post" /> || (
                  <video autoPlay loop muted className="post">
                    <source src={item.video} />
                  </video>
                )
              )}
            </span>
          ))
        )}
      </div>
    </div>
  );
});

export default ProfilePosts;
