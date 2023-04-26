import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Container from "@mui/material/Container";
import PostCard from "./PostCard";
import RecomendUsers from "./RecomendUsers";
import ErrorModal from "../../partial/modal/ErrorModal";
import { useStores } from "../../../stores/MainStore";
// eslint-disable-next-line no-unused-vars
import feed from "./feed.scss";
import Footer from "../../partial/footer/Footer";
import Aside from "./Aside";

const FeedPage = observer(() => {

  const { RequestsStore, ConfigStore } = useStores();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    new Promise((resolve, rejects) => {
      resolve();
    })
    .then(() => {
      return RequestsStore.doGet(ConfigStore.url + "/posts");
    })
    .then((post) => {
      if(post === "Forbidden") {
        ConfigStore.setErr("Token has been burned");
        ConfigStore.setIsShow(true);
      } else {
        setPosts(post);
      }
    })
  }, []);

  return (
    <>
      <div className="main__feed">
        <div className="feed__header">
          <h2>Feed page | Favoriets from students</h2>
        </div>
        <main className="feed">
          <Container
            maxWidth="xl"
            style={{ background: "none", position: "relative" }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Aside />
            <div className="feed__posts" style={{ background: "none", width: "100%" }}>
              {posts === undefined ? (
                <h2 className="errorCase">Sorry any posts found</h2>
              ) : (
                posts.slice().reverse().map((item) => (
                  <PostCard item={item} key={item._id} />
                ))
              )}
            </div>
            <RecomendUsers />
          </Container>
        </main>
        <ErrorModal />
      </div>
      <Footer />
    </>
  );
});

export default FeedPage;
