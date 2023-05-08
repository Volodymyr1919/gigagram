import * as React from "react";
import {
  Typography,
  Button,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  Box,
} from "@mui/material";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/joy/Avatar";
import AvatarGroup from "@mui/joy/AvatarGroup";
import { useStores } from "../../../stores/MainStore";
import Like from "../../partial/like/Like";

export default function PostCard(props) {
  const { ConfigStore } = useStores();

  const item = props.item;
  const navigate = useNavigate();

  const clampAvatars = React.useCallback((avatars, options = { max: 5 }) => {
    const { max = 5, total } = options;
    let clampedMax = max < 2 ? 2 : max;
    const totalAvatars = total || avatars.length;
    if (totalAvatars === clampedMax) {
      clampedMax += 1;
    }
    clampedMax = Math.min(totalAvatars + 1, clampedMax);
    const maxAvatars = Math.min(avatars.length, clampedMax - 1);
    const surplus = Math.max(
      totalAvatars - clampedMax,
      totalAvatars - maxAvatars,
      0
    );
    return { avatars: avatars.slice(0, maxAvatars).reverse(), surplus };
  }, []);

  const { avatars, surplus } = clampAvatars(item.likes, {
    max: 4,
    total: item.likes.length,
  });

  return (
    <Card
      className="postCard"
      sx={{
        width: 600,
        borderRadius: "25px",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
      }}
      key={item._id}
    >
      <CardHeader
        avatar={
          <Avatar
            onClick={() => navigate(`/user/${item.user[0].username}`)}
            className="user__avatar"
            src={item && item.user[0] ? item.user[0].avatar : "some defaul src"}
            alt="my avatar"
            sx={{ width: 60, height: 60 }}
            aria-label="recipe"
          ></Avatar>
        }
        title={item && item.user[0] ? item.user[0].username : "some defaul src"}
      />
      {item.video && item.video !== "any" ? (
        <CardMedia
          component="video"
          image={item.video}
          autoPlay
          loop
          muted
          playsInline
          style={{
            objectFit: "contain",
            width: "100%",
          }}
        />
      ) : (
        <CardMedia
          component="img"
          image={item.image}
          style={{
            objectFit: "contain",
            width: "100%",
          }}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Like like_id={item._id} userLikes={item.likes} />
          <AvatarGroup sx={{ ml: 2 }}>
            {avatars.map((element, index) => (
              <Avatar
                key={index + Math.random()}
                src={ConfigStore.url + "/avatar/" + element.fromUser}
              />
            ))}
            {!!surplus && <Avatar>+{surplus}</Avatar>}
          </AvatarGroup>
        </Box>
        <Button size="small" onClick={() => navigate(`/post/${item._id}`)}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
