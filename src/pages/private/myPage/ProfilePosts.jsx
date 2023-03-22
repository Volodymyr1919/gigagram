import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
// eslint-disable-next-line no-unused-vars
import styles from "./scss/posts.scss";

function ProfilePosts() {
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    function getUserPosts() {
      fetch("http://65.109.13.139:9191/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          user_id: localStorage.getItem("user_id"),
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then((data) => {
          if (data.ok) {
            return data.json();
          } else {
            setErr(data.statusText);
            setShow(true);
            return;
          }
        })
        .then((data) => {
          // console.log(data);
          const filteredData = data.filter(
            (item) => item.author._id === localStorage.getItem("user_id")
          );
          localStorage.setItem("posts_length", filteredData.length);
          setPosts(filteredData);
        });
    }

    getUserPosts();
  }, []);

  function handleClose() {
    setShow(false);
    navigate("/signin");
  }

  return (
    <div className="posts_block">
      <div className="posts_container">
        {posts === undefined ? (
          <h2 className="errorCase">Sorry any posts found</h2>
        ) : (
          posts.map((item) => (
            <span
              key={item._id}
              className=""
              onClick={() => navigate(`/post/${item._id}`)}
            >
              {item.image && item.video ? (
                <AliceCarousel>
                  <img src={item.image} alt={item.image} className="post" />
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
      <Modal show={show}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{err}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProfilePosts;
