import React, { useState, useEffect }   from "react";
import { useNavigate }                  from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import feed                             from "./feed.scss";
import logo                             from "../../../assets/img/logo.png";
import ToMyPage                         from "./ToMyPage";
import { NavLink }                      from "react-router-dom";
import PostCard                         from "./PostCard";
import ErrorModal                       from "../../partial/ErrorModal";
import RecomendUsers                    from "./RecomendUsers";
import Container                        from '@mui/material/Container';
import Box                              from '@mui/material/Box';

export default function Feed() {

    const [posts, setPosts] = useState([]);
    const [isShow, setShow] = useState(false);
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
                    data.statusText === "Forbidden" ? setErr("Token has been burned") : setErr(data.statusText);
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
                {/* <NavLink to="/feed">
                    <figure className="header__logo">
                        <img src={logo} alt="logo" />
                    </figure>
                </NavLink> */}
                <h2>Feed page | Favoriets from students</h2>
            </header>
            <main className="feed">
                <Container
                    maxWidth="xl"
                    style={{background: "#fff"}}
                    sx={{display: 'flex', justifyContent: 'space-between'}}
                >
                    <div className="feed__posts">
                        {
                            posts === undefined ?
                            <h2 className="errorCase">Sorry any posts found</h2>
                            :
                            posts.map(item => <PostCard item={item} key={item._id} />)
                        }
                    </div>
                    <RecomendUsers />
                </Container>
            </main>
            <ErrorModal isShow={isShow} setShow={setShow} err={err} onClose={handleClose} />
        </div>
    );
}