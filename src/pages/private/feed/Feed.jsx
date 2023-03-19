import React, { useState, useEffect }   from "react";
import { useNavigate }                  from "react-router-dom";
import { Modal, Button }                from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";
// eslint-disable-next-line no-unused-vars
import feed                             from "./feed.scss";
import logo                             from "../../../assets/img/logo.png";
import AliceCarousel                    from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ToMyPage                         from "./ToMyPage";
import { NavLink }                      from "react-router-dom";

export default function Feed() {

    const [posts, setPosts] = useState([]);
    const [show, setShow] = useState(false);
    const [err, setErr] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        function getPosts() {
            fetch('http://65.109.13.139:9191/posts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token')
                }
            })
            .then((data) => {
                if (data.ok) {
                    return data.json();
                } else {
                    setErr(data.statusText);
                    setShow(true);
                    return;
                }
            })
            .then((data) => {
                // console.log(data);
                setPosts(data);
            })
        }
        getPosts();
    },[]);

    function handleClose() {
        setShow(false);
        navigate("/signin");
    };

    return(
        <div className="main__feed">
            <header className="feed__header">
                <NavLink to="/">
                    <figure className="header__logo">
                        <img src={logo} alt="logo" />
                    </figure>
                </NavLink>
                <h2>Feed page | Favoriets from students</h2>
                <NavLink to="/my-page">
                    <div className="header__me">
                        <ToMyPage />
                    </div>
                </NavLink>
            </header>
            <span className="feed__posts">
                {
                    posts === undefined ?
                    <h2 className="errorCase">Sorry any posts found</h2>
                    :
                    posts.map(item => 
                        <span key={item._id} className="posts__container" onClick={() => navigate(`/post/${item._id}`)}>
                                {
                                item.image && item.video ?
                                <AliceCarousel>
                                    <img src={item.image} alt={item.image} className="container__img"/>
                                    <video autoPlay loop muted className="container__video">
                                        <source src={item.video} />
                                    </video> 
                                </AliceCarousel>
                                :
                                <img src={item.image} alt="" className="container__img"/>
                                ||
                                <video autoPlay loop muted className="container__video">
                                    <source src={item.video} />
                                </video>
                                }
                        </span>)
                }
            </span>
            <Modal show={show}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {err}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>OK</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}