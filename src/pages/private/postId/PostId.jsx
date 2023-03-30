import { useEffect } from "react";
import { useParams } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import ToMyPage from "../feed/ToMyPage";
import { NavLink } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import { observer } from "mobx-react";
import PostIdStore from "../../../stores/privateStores/PostIdStore";
// eslint-disable-next-line no-unused-vars
import PostStyle from "./postid.scss";

const PostId = observer(() => {
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://65.109.13.139:9191/post/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        PostIdStore.setPost(data);
      });
  }, [id]);

  if (!PostIdStore.post) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="main__postid">
      <header className="postid__header">
        <NavLink to="/feed">
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
          <div className="blog-post-header__info">
            <figure className="user__avatar">
              <img src={PostIdStore.post.author.avatar} alt="my avatar" />
            </figure>
            <p className="user__username">{PostIdStore.post.author.username}</p>
            <NavLink to="/notfound" className="blog-post__cta">
              Follow me
            </NavLink>
          </div>

          <h2 className="blog-post__title">{PostIdStore.post.title}</h2>
          <p>{PostIdStore.post.description}</p>
          <span className="posts__container">
            {PostIdStore.post.image && PostIdStore.post.video ? (
              <AliceCarousel className="blog-post__img">
                <img
                  src={PostIdStore.post.image}
                  alt={PostIdStore.post.image}
                />
                <video autoPlay loop muted className="container__video">
                  <source src={PostIdStore.post.video} />
                </video>
              </AliceCarousel>
            ) : (
              (
                <img
                  src={PostIdStore.post.image}
                  alt=""
                  className="container__img"
                />
              ) || (
                <video autoPlay loop muted className="container__video">
                  <source src={PostIdStore.post.video} />
                </video>
              )
            )}
          </span>
        </div>
      </article>
      <NavLink to="/back">
        <div className="blog-post__cta">Back</div>
      </NavLink>
    </div>
  );
});
export default PostId;
