import React, { useState, useEffect }   from "react";
import { useNavigate }                  from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import feed                             from "./feed.scss";
import logo                             from "../../../assets/img/logo.png";
import ToMyPage                         from "./ToMyPage";
import PostCard                         from "./PostCard";  
import { NavLink }                      from "react-router-dom";
import ErrorModal                       from "../../partial/ErrorModal";

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
                <NavLink to="/feed">
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
            <div>
                {posts.map(item => <PostCard post={item}/>)}
            </div>
            <span className="feed__posts">
                {
                    posts === undefined ?
                    <h2 className="errorCase">Sorry any posts found</h2>
                    :
                    posts.map(item => <PostCard item={item} key={item._id}/>)
                }
            </span>
            <ErrorModal isShow={isShow} setShow={setShow} err={err} onClose={handleClose} />
        </div>
    );
}