import * as React         from "react";
import { useParams }      from "react-router-dom";
import { Box }            from "@mui/material";
import { observer }       from "mobx-react";
import { useStores } from "../../../stores/MainStore";
// eslint-disable-next-line no-unused-vars
import PostStyle          from "./postid.scss";
import Card               from "@mui/material/Card";
import Avatar             from "@mui/material/Avatar";
import CardMedia          from "@mui/material/CardMedia";
import CardHeader         from "@mui/material/CardHeader";
import DeletePost         from "../../partial/DeletePost";
import AliceCarousel      from "react-alice-carousel";

const PostId = observer(() => {

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
      setPost(data);
    })
  }, [id]);

  if (!post) {
    return <div className="loader">Loading...</div>;
  }
  
  return (
    <>
      {post === "Not Found" ? <p>Sorry, post has been deleted</p> :
        <Card
        className="main__postid"
        style={{ backgroundColor: "#F8B819" }}
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
              <Avatar
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
    </>
  );
});
export default PostId;
