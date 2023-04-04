import { makeAutoObservable } from "mobx";

class EditStore {
    newUsername = "";
    newFullname = "";
    newAvatar   = "";
    newAge      = "";
    newBio      = "";

    constructor() {
        makeAutoObservable(this)
    }
    setNewUsername(newUsername) {
        this.newUsername = newUsername
    }
    setNewFullname(newFullname) {
        this.newFullname = newFullname
    }
    setNewAvatar(newAvatar) {
        this.newAvatar = newAvatar
    }
    setNewAge(newAge) {
        this.newAge = newAge
    }
    setNewBio(newBio){
        this.newBio = newBio
    }

    onSubmit(data) {
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            username: data.username,
            fullname: data.fullname,
            avatar: data.avatar,
            age: data.age,
            bio: data.bio,
          }),
        };
    
        fetch("http://65.109.13.139:9191/me", requestOptions)
          .then((data) => {
            return data.json();
          })
          .then((data) => {
            console.log(data);
          });
      }
}
export default new EditStore()