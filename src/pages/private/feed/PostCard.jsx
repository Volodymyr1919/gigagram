import * as React         from 'react';
import { Typography, Button, CardHeader, CardMedia, CardContent, CardActions, Card, Box  } from '@mui/material';
import AliceCarousel      from "react-alice-carousel";
import                          "react-alice-carousel/lib/alice-carousel.css";
import { useNavigate }    from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import { useStores } from '../../../stores/MainStore';
import { useEffect } from 'react';

export default function PostCard(props) {
    const { RequestsStore, ConfigStore } = useStores();
    const [likes, setLikes] = React.useState(0);
    const [iconColor, setIconColor] = React.useState("action");
    const [avatars, setAvatars] = React.useState([]);
    const [surplus, setSurplus] = React.useState(0);



    let item = props.item;
    const navigate = useNavigate();

    function handleLike() {
        RequestsStore.doPost(ConfigStore.url + "/like", {
            post_id: item._id
        })
          .then((data) => {
            setLikes(data.likes);
            setIconColor("error");
         })
          .catch((error) => console.error(error));
      };

      useEffect(() => {
        if(item) {
            item.likes.find((liked) => liked.fromUser === ConfigStore.me._id) ? setIconColor("error") : setIconColor("action");
        }
      }, [item.likes]);

  return (
        <Card sx={{ 
                width: 600,
                borderRadius: "25px",
                boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
            }} key={item._id}>
            <CardHeader 
            avatar={
              <Avatar onClick = {() => navigate(`/user/${item.user[0].username}`)}
                className="user__avatar"
                src={item && item.user[0] ? item.user[0].avatar : 'some defaul src'}
                alt="my avatar"
                sx={{ width: 60, height: 60 }}
                aria-label="recipe"
              ></Avatar>
            }
            title={item && item.user[0] ? item.user[0].username : 'some defaul src'}
          />
            {item.video && item.video !== "any" && item.image ? 
                <AliceCarousel disableButtonsControls='true' touchTracking='true' touchMoveDefaultEvents='false'>
                    <CardMedia
                        component="img"
                        image={item.image}
                        style={{
                            objectFit: "contain",
                            width: "100%",
                            height: "fit-content"
                        }}
                    />
                    <CardMedia
                        component="video"
                        image={item.video}
                        autoPlay
                        loop
                        muted
                        mediaGroup='mp4'
                        style={{
                            objectFit: "contain",
                            width: "100%",
                            height: "fit-content"
                        }}
                    />
                </AliceCarousel>
                
            :
                <CardMedia
                    component="img"
                    image={item.image}
                    style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "fit-content"
                    }}
                />
                ||
                <CardMedia
                    component="video"
                    image={item.video}
                    autoPlay
                    loop
                    muted
                    mediaGroup='mp4'
                    style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "fit-content"
                    }}
                />
            }
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {item.description}
                </Typography>
            </CardContent>
            <Box style={{display: "flex", alignItems: "center"}}>
                <FavoriteIcon sx={{ ml: 2}} color={iconColor} onClick={handleLike} />
                <AvatarGroup sx={{ ml: 2}}>
                    {item.likes.map((element, index) => (
                        <Avatar key={index + Math.random()} src={ConfigStore.url + "/avatar/" + element.fromUser}/>
                    ))}
                    {!!surplus && <Avatar>+{surplus}</Avatar>}
                </AvatarGroup>
            </Box>
            <CardActions>
                <Button size="small" onClick={() => navigate(`/post/${item._id}`)}>Learn More</Button>
            </CardActions>
        </Card>
  );
}
