import { makeAutoObservable } from "mobx";

class FollowingsStore {
  followings = [];

  constructor() {
    makeAutoObservable(this);
  }
  setFollowings(followings) {
    this.followings = followings;
  }
  getFollowings() {
    fetch("http://65.109.13.139:9191/followings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());
        console.log(data);
        this.setFollowings(data.following);

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
}

export default new FollowingsStore();
