import * as React         from 'react';
import { Avatar, Typography, Button, CardHeader, CardMedia, CardContent, CardActions, Card  } from '@mui/material';
import AliceCarousel      from "react-alice-carousel";
import                          "react-alice-carousel/lib/alice-carousel.css";
import { useNavigate }    from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AvatarGroup from '@mui/joy/AvatarGroup';
import { useStores } from '../../../stores/MainStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function PostCard(props) {
    const { RequestsStore, ConfigStore } = useStores();
    const [likes, setLikes] = React.useState(0);
    const [iconColor, setIconColor] = React.useState("action");
    const [avatars, setAvatars] = React.useState([]);
    const [surplus, setSurplus] = React.useState(0);
    const [userLike, setUserLike] = React.useState([]);

    const { id } = useParams();

    let item = props.item;
    const navigate = useNavigate();

    function handleLike() {
        RequestsStore.doPost(ConfigStore.url + "/like", {
            post_id: item._id
        })
          .then((data) => {
            setLikes(data.likes);
            setIconColor("red");
         })
          .catch((error) => console.error(error));
      };

      useEffect(() => {
        if (item) {
            RequestsStore.doGet(ConfigStore.url + "/likes/" + item._id)
            .then((res) => {
                if(res.count >= 0) {
                    return res.data.map((item) => (item.fromUser.username));
                }
            })
            .then((data) => {
                setUserLike(data);
                if(data.includes(ConfigStore.me.username)) {
                    setIconColor("red");
                }
            })
        }
      }, [item]);

  return (
        <Card sx={{ width: 600 }}>
            <CardHeader 
            avatar={
              <Avatar onClick = {() => navigate(`/user/${item.author.username}`)}
                className="user__avatar"
                src={item && item.author ? item.author.avatar : 'some defaul src'}
                alt="my avatar"
                sx={{ width: 60, height: 60 }}
                aria-label="recipe"
              ></Avatar>
            }
            title={item && item.author ? item.author.username : 'some defaul src'}
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
            {/* <AvatarGroup>
            {avatars.map((avatar, index) => (
                <Avatar key={index} {...avatar} />
                ))}

                {!!surplus && <Avatar>+{surplus}</Avatar>}
            </AvatarGroup> */}
            <CardActions>
                <Button size="small" onClick={() => navigate(`/post/${item._id}`)}>Learn More</Button>
            </CardActions>
        </Card>
  );
}
