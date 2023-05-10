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
import { Fade, Toolbar, useScrollTrigger, Fab, Box } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
};


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
      //  ConfigStore.setLoading(false);
      if(post === "Forbidden") {
        ConfigStore.setErr("Token has been burned");
        ConfigStore.setIsShow(true);
      } else {
        setPosts(post);
      }
    })
  }, []);

  useEffect(() => {
    if(ConfigStore.me.username) {
      RequestsStore.doGet(ConfigStore.url + "/followings/" + ConfigStore.me.username)
      .then((resp) => {
        ConfigStore.setFollowings(resp.following);
      })
    } else{
      return;
    }
  }, [ConfigStore.me.username]);

  return (
    <>
      <Toolbar id="back-to-top-anchor" style={{position: "absolute", top: 0, zIndex: "-1"}} />
     
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
              {posts === "Not Found" ? (
                <h2 className="errorCase">Sorry any posts found</h2>
              ) : (
                posts.slice().reverse().map((item) => (
                  <PostCard item={item} key={item._id}/>
                ))
              )}
            </div>
            <RecomendUsers />
          </Container>
        </main>
        <ErrorModal />
      </div>
     
      <Footer />
      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </>
  );
});

export default FeedPage;