import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Container from "@mui/material/Container";
import PostCard from "./PostCard";
import RecomendUsers from "./RecomendUsers";
import ErrorModal from "../../partial/ErrorModal";
import FeedStore from "../../../stores/privateStores/FeedStore";
// eslint-disable-next-line no-unused-vars
import feed from "./feed.scss";

const FeedPage = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    FeedStore.getPosts();
    FeedStore.getMe();
  }, []);

  function handleClose() {
    FeedStore.setIsShow(false);
    navigate("/signin");
  }

  return (
    <div className="main__feed">
      <header className="feed__header">
        <h2>Feed page | Favoriets from students</h2>
      </header>
      <main className="feed">
        <Container
          maxWidth="xl"
          style={{ background: "#fff" }}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="feed__posts">
            {FeedStore.posts === undefined ? (
              <h2 className="errorCase">Sorry any posts found</h2>
            ) : (
              FeedStore.posts.map((item) => (
                <PostCard item={item} key={item._id} />
              ))
            )}
          </div>
          <RecomendUsers />
        </Container>
      </main>
      <ErrorModal
        isShow={FeedStore.isShow}
        setShow={FeedStore.setIsShow}
        err={FeedStore.err}
        onClose={handleClose}
      />
    </div>
  );
});

export default FeedPage;
