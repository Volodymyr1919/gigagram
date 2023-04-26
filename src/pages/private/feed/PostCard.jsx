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
        <Card sx={{ width: 600, borderRadius: "25px", boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px" }}>
            <CardHeader />
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
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small" onClick={() => navigate(`/post/${item._id}`)}>Learn More</Button>
            </CardActions>
        </Card>
  );
}
