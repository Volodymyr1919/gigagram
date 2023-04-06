import { makeAutoObservable } from "mobx";

class UserPostsStore {
  posts = [];
  IsShow = false;
  err = "";
  user_id = "";
  url = "";
  posts_length = 0;

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

  setUserId(userId) {
    this.user_id = userId;
    this.url = "http://65.109.13.139:9191/posts?user_id=" + this.user_id;
  }

  getUserPosts() {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      throw new Error("user_id not found in localStorage");
    }
    this.setUserId(userId);

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
        localStorage.setItem("posts_length", data.length);
        this.posts_length = localStorage.getItem("posts_length");
        this.setPosts(data);
      });
  }
}

export default UserPostsStore;
