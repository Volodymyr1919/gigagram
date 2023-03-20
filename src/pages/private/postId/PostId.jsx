import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import ToMyPage from "../feed/ToMyPage";
import { NavLink } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import Feed from "../feed/Feed";
// eslint-disable-next-line no-unused-vars
import PostStyle from "./postid.scss";

export default function PostId() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // fetch post data using the ID
    fetch(`http://65.109.13.139:9191/post/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="main__postid">
      <header className="postid__header">
        <NavLink to="/">
          <figure className="header__logo">
            <img src={logo} alt="logo" />
          </figure>
        </NavLink>

        <NavLink to="/my-page">
          <div className="header__me">
            <ToMyPage />
          </div>
        </NavLink>
      </header>

      <article className="blog-post">
        <div className="blog-post__info">
          <h2 className="blog-post__title">{post.title}</h2>
          <p>{post.description}</p>
          <span className="posts__container">
            {post.image && post.video ? (
              <AliceCarousel className="blog-post__img">
                <img src={post.image} alt={post.image} />
                <video autoPlay loop muted className="container__video">
                  <source src={post.video} />
                </video>
              </AliceCarousel>
            ) : (
              <img src={post.image} alt="" className="container__img" /> || (
                <video autoPlay loop muted className="container__video">
                  <source src={post.video} />
                </video>
              )
            )}
          </span>

          <a href="#" className="blog-post__cta">
            Follow me
          </a>
        </div>
      </article>
      <NavLink to="/feed">
        <div className="blog-post__cta">Favoriets from students</div>
      </NavLink>
    </div>
  );
}
