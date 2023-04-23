import React, { useEffect, useState } from "react";
import { useNavigate }                from "react-router-dom";
import AliceCarousel                  from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ImageList                      from "@mui/material/ImageList";
import ImageListItem                  from "@mui/material/ImageListItem";
import Paper                          from '@mui/material/Paper';
import Loading                        from "../../partial/Loading";
import { styled }                     from '@mui/material/styles';
import { observer }                   from "mobx-react";
import { useStores }                  from "../../../stores/MainStore";

const ProfilePosts = observer((props) => {

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
    <ImageList variant="masonry" cols={3} gap={8}>
      {ConfigStore.myPosts === undefined ? (
        <h2 className="errorCase">Sorry any posts found</h2>
      ) : (
        ConfigStore.myPosts.map((item) => (
          <ImageListItem
            key="{item._id}"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/post/${item._id}`)}
          >
            {item.image && item.video ? (
              <AliceCarousel
                disableButtonsControls
                dotsDisabled={true}
                touchTracking
                touchMoveDefaultEvents
              >
                <img
                  src={`${item.image}`}
                  alt={item.image}
                  loading="lazy"
                  className="post"
                  style={{
                    objectFit: "cover",
                    maxWidth: "100%",
                    margin: "auto",
                    width: "100%",
                    height: "auto",
                  }}
                />
                <video
                  autoPlay
                  loop
                  muted
                  className="post"
                  style={{
                    objectFit: "cover",
                    maxWidth: "100%",
                    margin: "auto",
                    width: "100%",
                    height: "auto",
                  }}
                >
                  <source src={item.video} />
                </video>
              </AliceCarousel>
            ) : (
              <div>
                {item.image && (
                  <img
                    src={`${item.image}`}
                    srcSet={`${item.image}`}
                    alt={item.image}
                    loading="lazy"
                    className="post"
                    style={{
                      objectFit: "cover",
                      maxWidth: "100%",
                      margin: "auto",
                      width: "100%",
                      height: "auto",
                    }}
                  />
                )}
                {item.video && (
                  <video
                    autoPlay
                    loop
                    muted
                    className="post"
                    style={{
                      objectFit: "cover",
                      maxWidth: "100%",
                      margin: "auto",
                      width: "100%",
                      height: "auto",
                    }}
                  >
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

export default ProfilePosts;
