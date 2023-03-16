import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    console.log("User credentials", data);
    // POST request using fetch with error handling
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.userName,
        password: data.password,
      }),
    };
    fetch("http://65.109.13.139:9191/signin", requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());
        console.log(data);
        localStorage.setItem("token", data.token);

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
          
        }
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
  };

  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  function _password(e) {
    setPassword(e.target.value);
  }
  function _userName(e) {
    setUserName(e.target.value);
  }

  return (
    <section>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="userName"
          placeholder="User Name"
          className="input"
          {...register("userName", {
            required: "User Name is required",
            minLength: { value: 4, message: "User name is min 4 symbols" },
            value: userName,
            onChange: (e) => {
              _userName(e);
            },
          })}
        />{" "}
        {errors.userName && <p style={{ color: "red" }}>{errors.userName.message}</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 5, message: "Password will be min 5 symbols" },
            value: password,
            onChange: (e) => {
              _password(e);
            },
          })}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        <button className="btn">Sign In</button>
      </form>
      <p>
        Need an Account?
        <br />
        <br />
        <span className="line">
          <Link to="/signup">Sign Up</Link>
        </span>
      </p>
    </section>
  );
}
