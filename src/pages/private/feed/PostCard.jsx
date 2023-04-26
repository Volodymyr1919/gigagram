import * as React         from 'react';
import { Typography, Button, CardHeader, CardMedia, CardContent, CardActions, Card  } from '@mui/material';
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
            item.likes.find((liked) => liked.fromUser) ? setIconColor("error") : setIconColor("action");
        }
      }, [item.likes]);

  return (
        <Card sx={{ width: 600 }} key={item._id}>
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
                        height="300"
                        image={item.image}
                    />
                    <CardMedia
                        component="video"
                        height="300"
                        image={item.video}
                        autoPlay
                        loop
                        muted
                        mediaGroup='mp4'
                    />
                </AliceCarousel>
                
            :
                <CardMedia
                    component="img"
                    height="300"
                    image={item.image}
                />
                ||
                <CardMedia
                    component="video"
                    height="300"
                    image={item.video}
                    autoPlay
                    loop
                    muted
                    mediaGroup='mp4'
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
            <FavoriteIcon sx={{ ml: 2}} color={iconColor} onClick={handleLike} />
            <AvatarGroup>
            {item.likes.map((element, index) => (
                <Avatar key={index + Math.random()} src={ConfigStore.url + "/avatar/" + element.fromUser}/>
                ))}
                {!!surplus && <Avatar>+{surplus}</Avatar>}
            </AvatarGroup>
            <CardActions>
                <Button size="small" onClick={() => navigate(`/post/${item._id}`)}>Learn More</Button>
            </CardActions>
        </Card>
  );
}
