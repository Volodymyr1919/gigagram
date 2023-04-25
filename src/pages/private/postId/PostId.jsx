import * as React         from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Card, Avatar, CardMedia, CardHeader } from "@mui/material";
import { observer }       from "mobx-react";
import { useStores } from "../../../stores/MainStore";
// eslint-disable-next-line no-unused-vars
import PostStyle          from "./postid.scss";
import DeletePost         from "../../partial/modal/DeletePost";
import AliceCarousel      from "react-alice-carousel";
import ErrorModal from "../../partial/modal/ErrorModal";

const PostId = observer(() => {

  const navigate = useNavigate();

  const { RequestsStore, ConfigStore } = useStores();

  const { id } = useParams();

  const [post, setPost] = React.useState("");

  React.useEffect(() => {
    new Promise((resolve, rejects) => {
      resolve();
    })
    .then(() => {
      return RequestsStore.doGet(ConfigStore.url + "/post/" + id);
    })
    .then((data) => {
      if (data === "Forbidden") {
        ConfigStore.setErr("Token has been burned");
        ConfigStore.setIsShow(true);
      } else {
        setPost(data);
      }
    })
  }, [id]);
  
  return (
    <>
      <div className="postId" style={{
        background: `url(${post.image})`,
      }}>
        {!post ? <div className="loader">Loading...</div> :
          <Card
            className="main__postid"
            sx={{
              maxWidth: 600,
              boxShadow: 1,
              borderRadius: 5,
              p: 2,
              minWidth: 300,
            }}
          >
            <CardHeader
              avatar={
                <Avatar onClick = {() => navigate(`/user/${post.author.username}`)}
                  className="user__avatar"
                  src={post.author.avatar}
                  alt="my avatar"
                  sx={{ width: 60, height: 60 }}
                  aria-label="recipe"
                ></Avatar>
              }
              action={
                <Box sx={{ m: 2 }}>
                  <DeletePost sx={{ m: 2 }} />
                </Box>
              }
              title={post.title}
              subheader={post.description}
            />
            <CardMedia className="posts__container">
              {post.image && post.video ? (
                <AliceCarousel className="blog-post__img">
                  <img src={post.image} alt={post.image} />
                  <video autoPlay loop muted className="container__video">
                    <source src={post.video} />
                  </video>
                </AliceCarousel>
              ) : (
                (
                  <img
                    src={post.image}
                    alt=""
                    className="container__img"
                  />
                ) || (
                  <video autoPlay loop muted className="container__video">
                    <source src={post.video} />
                  </video>
                )
              )}
            </CardMedia>
          </Card>  
        }
        <div className="bg_blur"></div>
      </div>
      <ErrorModal />
    </>
  );
});
export default PostId;
