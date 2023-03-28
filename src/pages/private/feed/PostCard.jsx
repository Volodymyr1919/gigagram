import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function PostCard(props) {
  let item = props.item;
  return (
    <Card sx={{ width: 568.4 }}>
      {item.video && item.video !== "any" && item.image ? (
        <AliceCarousel>
          <CardMedia component="img" height="540" image={item.image} />
          <CardMedia
            component="video"
            height="540"
            image={item.video}
            autoPlay
            loop
            muted
            mediaGroup="mp4"
          />
        </AliceCarousel>
      ) : (
        <CardMedia component="img" height="540" image={item.image} /> || (
          <CardMedia
            component="video"
            height="540"
            image={item.video}
            autoPlay
            loop
            muted
            mediaGroup="mp4"
          />
        )
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Fab size="small" color="warning" aria-label="add">
          <AddIcon />
        </Fab>
        <Fab size="small" color="warning" aria-label="edit">
          <EditIcon />
        </Fab>
        <Fab size="small" color="warning" aria-label="like">
          <FavoriteIcon />
        </Fab>
      </CardActions>
    </Card>
  );
}
