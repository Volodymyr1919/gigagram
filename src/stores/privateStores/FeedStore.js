import { makeAutoObservable } from "mobx";

class FeedStore {
  posts = [];
  isShow = false;
  avatar = "";
  err = "";

  constructor(MainStore) {
    this.MainStore = MainStore;
    makeAutoObservable(this);
  }

  setPosts(posts) {
    this.posts = posts;
  }

  setIsShow(isShow) {
    this.isShow = isShow;
  }

  setErr(err) {
    this.err = err;
  }

  // getPosts() {
  //   fetch("http://65.109.13.139:9191/posts", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-access-token": localStorage.getItem("token"),
  //     },
  //   })
  //     .then((data) => {
  //       if (data.ok) {
  //         return data.json();
  //       } else {
  //         data.statusText === "Forbidden"
  //           ? this.setErr("Token has been burned")
  //           : this.setErr(data.statusText);
  //         this.setIsShow(true);
  //         return;
  //       }
  //     })
  //     .then((data) => {
  //       this.setPosts(data);
  //     });
  // }

  getMe() {
    fetch("http://65.109.13.139:9191/me", {
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
        localStorage.setItem("user_id", data._id);
        localStorage.setItem("avatar", data.avatar);
        this.avatar = localStorage.getItem("avatar");
      });
  }
}

export default FeedStore;
