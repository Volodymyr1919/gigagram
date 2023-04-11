import { makeAutoObservable } from "mobx";

class UserInfoStore {
  isShow = false;
  editShow = false;
  followers = "";
  followings = "";
  fullname = "";
  bio = "";
  avatar = "";
  username = "";

  constructor() {
    makeAutoObservable(this);
  }

  setShow(isShow) {
    this.isShow = isShow;
  }
  setEditShow(editShow){
    this.editShow = editShow
  }

  setFollowers(followers) {
    this.followers = followers;
  }

  setFollowings(followings) {
    this.followings = followings;
  }

  setFullname(fullname) {
    this.fullname = fullname;
  }

  setBio(bio) {
    this.bio = bio;
  }

  setAvatar(avatar) {
    this.avatar = avatar;
  }

  setUsername(username) {
    this.username = username;
  }

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

        this.setUsername(data.username);
        this.setBio(data.bio);
        this.setFullname(data.fullName);
        this.setAvatar(data.avatar);
      });
  }

  getFollowers(username) {
    console.log("UserInfoStore.username", username);
    fetch("http://65.109.13.139:9191/followers/" + username, {
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
        this.setFollowers(data.followers.length);
      });
  }

  getFollowings(username) {
    fetch("http://65.109.13.139:9191/followings/" + username, {
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
        this.setFollowings(data.following.length);
      });
  }
}
export default UserInfoStore;
