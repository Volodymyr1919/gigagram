import * as React         from 'react';
import Card               from '@mui/material/Card';
import CardActions        from '@mui/material/CardActions';
import CardContent        from '@mui/material/CardContent';
import CardMedia          from '@mui/material/CardMedia';
import CardHeader         from '@mui/material/CardHeader';
import Button             from '@mui/material/Button';
import Typography         from '@mui/material/Typography';
import AliceCarousel      from "react-alice-carousel";
import                          "react-alice-carousel/lib/alice-carousel.css";
import { useNavigate }    from 'react-router-dom';

export default function PostCard(props) {

    let item = props.item;

    const navigate = useNavigate();

  return (
        <Card sx={{ width: 600 }}>
            <CardHeader />
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
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small" onClick={() => navigate(`/post/${item._id}`)}>Learn More</Button>
            </CardActions>
        </Card>
  );
}
