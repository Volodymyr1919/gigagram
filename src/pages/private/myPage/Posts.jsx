import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { observer } from "mobx-react";
import { useStores } from "../../../stores/MainStore";
import styles from "./scss/posts.scss";

const ProfilePosts = observer(() => {
  const { UserPostsStore } = useStores();
  console.log("DATA", UserPostsStore.posts);
  const navigate = useNavigate();
  if (UserPostsStore.posts === undefined) {
    UserPostsStore.getUserPosts();
  }
  useEffect(() => {
    UserPostsStore.getUserPosts();
  }, []);

  function handleClose() {
    UserPostsStore.setShow(false);
    navigate("/signin");
  }

  return (
    <div className="posts_block">
      <div className="posts_container">
        {UserPostsStore.posts === undefined ? (
          <h2 className="errorCase">Sorry any posts found</h2>
        ) : (
          UserPostsStore.posts.map((item) => (
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
      <Modal IsShow={UserPostsStore.IsShow}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{UserPostsStore.err}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
});

export default ProfilePosts;
