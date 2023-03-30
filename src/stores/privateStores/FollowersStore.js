import { makeAutoObservable } from "mobx";

class FollowersStore {
  followers = [];

  constructor() {
    makeAutoObservable(this);
  }
  setFollowers(followers) {
    this.followers = followers;
  }

  getFollowers() {
    fetch("http://65.109.13.139:9191/followers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    }).then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson && (await response.json());
      console.log(data);
      this.setFollowers(data.followers);

      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
    });
  }
}
export default new FollowersStore();
