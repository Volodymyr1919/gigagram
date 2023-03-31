import * as React               from 'react';
import { useEffect }            from "react";
import { useParams }            from "react-router-dom";
import AliceCarousel            from "react-alice-carousel";
import { observer }             from "mobx-react";
import PostIdStore              from "../../../stores/privateStores/PostIdStore";
// eslint-disable-next-line no-unused-vars
import PostStyle                from "./postid.scss";
import Card                     from '@mui/material/Card';
import Fab                      from "@mui/material/Fab";
import EditIcon                 from "@mui/icons-material/Edit";
import Avatar                   from "@mui/material/Avatar";
import CardMedia                from '@mui/material/CardMedia';
import CardHeader               from '@mui/material/CardHeader';


const PostId = observer(() => {
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://65.109.13.139:9191/post/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        PostIdStore.setPost(data);
      });
  }, [id]);

  if (!PostIdStore.post) {
    return <div className="loader">Loading...</div>;
  }
  
  return (
      <Card className='main__postid'
        style={{ backgroundColor: '#F8B819'}}
        sx={{ 
          maxWidth: 600, 
          boxShadow: 1,
          borderRadius: 5,
          p: 2,
          minWidth: 300
          }}>
        <CardHeader
        
        avatar={
          <Avatar className="user__avatar"
          src={PostIdStore.post.author.avatar}
          alt="my avatar"
          sx={{ width: 60, height: 60 }} aria-label="recipe">
          </Avatar>
        }
        action={
          <Fab size="small" color="warning" aria-label="edit" sx={{m:2}}>
                <EditIcon />
          </Fab>
        }
        title={PostIdStore.post.title}
        subheader={PostIdStore.post.description}
       />
      <CardMedia className='posts__container'>
            {PostIdStore.post.image && PostIdStore.post.video ? (
              <AliceCarousel className="blog-post__img">
                <img
                  src={PostIdStore.post.image}
                  alt={PostIdStore.post.image}
                />
                <video autoPlay loop muted className="container__video">
                  <source src={PostIdStore.post.video} />
                </video>
              </AliceCarousel>
            ) : (
              (
                <img
                  src={PostIdStore.post.image}
                  alt=""
                  className="container__img"
                />
              ) || (
                <video autoPlay loop muted className="container__video">
                  <source src={PostIdStore.post.video} />
                </video>
              )
            )}
          </CardMedia>
    </Card> 
  );
});
export default PostId;
