import { makeAutoObservable } from "mobx";

class UserPostsStore {
  posts = [];
  IsShow = false;
  err = "";
  user_id = localStorage.getItem("user_id");
  url = "http://65.109.13.139:9191/posts?user_id=" + this.user_id;

  constructor() {
    makeAutoObservable(this);
  }

  setPosts(posts) {
    this.posts = posts;
  }

  setShow(isShow) {
    this.IsShow = isShow;
  }

  setErr(err) {
    this.err = err;
  }

  getUserPosts() {
    fetch(this.url, {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        user_id: this.user_id,
      },
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        } else {
          this.setErr(data.statusText);
          this.setShow(true);
          return;
        }
      })
      .then((data) => {
        // console.log(data);
        localStorage.setItem("posts_length", data.length);
        this.setPosts(data);
      });
  }
}
export default new UserPostsStore();
