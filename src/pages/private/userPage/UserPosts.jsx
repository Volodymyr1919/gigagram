import React, { useEffect, useState } from "react";
import { useNavigate }                from "react-router-dom";
import AliceCarousel                  from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ImageList                      from "@mui/material/ImageList";
import ImageListItem                  from "@mui/material/ImageListItem";
import Paper                          from '@mui/material/Paper';
import Loading                        from "../../partial/Loading";
import VideoLibraryIcon               from "@mui/icons-material/VideoLibrary";
import { styled }                     from '@mui/material/styles';
import { observer }                   from "mobx-react";
import { useStores }                  from "../../../stores/MainStore";
import ReceiptLongIcon                from '@mui/icons-material/ReceiptLong';

const UserProfilePosts = observer((props) => {

  const { RequestsStore, ConfigStore } = useStores();
  
  
  const { myId } = props;

  const navigate = useNavigate();

  const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

  useEffect(() => {
    if (myId !== undefined) {
      new Promise((resolve, rejects) => {
        resolve()
      })
      .then(() => {
        return RequestsStore.doGet(ConfigStore.url + "/posts?user_id=" + myId)
      })
      .then((myPosts) => {
        if (myPosts === "Forbidden") {
          ConfigStore.setErr("Token has been burned");
          ConfigStore.setIsShow(true);
        } else {
          ConfigStore.setMyPost(myPosts)
          ConfigStore.setUpdatePosts(false)
        }
      })
    } else {
      return;
    }
  }, [myId, ConfigStore.updatePosts]);

  return (
    <div style={{overflowWrap: "anywhere", width: "inherhit"}}>
    <ImageList
  cols={3}
  style={{
    height: "100%",
    display: ConfigStore.myPosts === "Not Found" ? "flex" : "grid",
    flexDirection: "column",
  }}
  className={!ConfigStore.myPosts.includes("postEmptyState") ? "imageListFlex" : ""}
>
  {ConfigStore.myPosts === "Not Found" ? (
    <div className="postEmptyState">
      <ReceiptLongIcon className="postEmptyState__icon" />
      <h2 className="errorCase"> Sorry any posts found</h2>
    </div>
  ) : (
          ConfigStore.myPosts.slice().reverse().map((item) => (
          <ImageListItem
            key={item._id + Math.random()}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/post/${item._id}`)}
          >
            {item.image && item.video ? (
              // <AliceCarousel
              //   disableButtonsControls
              //   dotsDisabled={true}
              //   touchTracking
              //   touchMoveDefaultEvents
              // >
              <div className="item_video">
                <span className="set-icon">
                    <VideoLibraryIcon />
                  </span>
                  <img
                    src={`${item.image}`}
                    alt={item.image}
                    loading="lazy"
                    className="post"
                  />
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="post"
                  style={{ display: "none" }}
                >
                  <source src={item.video} />
                </video>
              </div>
              // </AliceCarousel>
            ) : (
              <div className="item_video">
                {item.image && (
                  <img
                    src={`${item.image}`}
                    srcSet={`${item.image}`}
                    alt={item.image}
                    loading="lazy"
                    className="post"
                  />
                )}
                {item.video && (
                <video autoPlay loop muted playsInline className="post">
                   <source src={`${item.video}`} />
                </video>
                )}
              </div>
            )}
          </ImageListItem>
        ))
      )}
    </ImageList>
    </div>
  );
});

export default UserProfilePosts;