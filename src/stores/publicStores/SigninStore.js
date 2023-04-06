import { makeAutoObservable } from "mobx";

class SigninStore {
  username = "";
  password = "";
  isShow = "";
  err = "";

  constructor() {
    makeAutoObservable(this);
  }

  setUsername(username) {
    this.username = username;
  }
  setPassword(password) {
    this.password = password;
  }
  setShow(isShow) {
    this.isShow = isShow;
  }
  setErr(err) {
    this.err = err;
  }

  async signIn(username, password) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };

    const response = await fetch(
      "http://65.109.13.139:9191/signin",
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      return data.token;
    } else {
      this.setShow(true);
      const errorMessage =
        response.statusText === "Bad Request"
          ? "Wrong username or password"
          : response.statusText;
      this.setErr(errorMessage);
    }
  }
}
export default SigninStore;
