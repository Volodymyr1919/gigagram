import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    console.log(data);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.userName,
        password: data.password,
        confirm_password: data.confirmPassword,
      }),
    };
    fetch("http://65.109.13.139:9191/signup", requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());
        console.log(data);
        localStorage.setItem("token", data.jwt);
        localStorage.setItem("user_id", data.id);

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
  };

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function _userName(e) {
    setUserName(e.target.value);
  }
  function _password(e) {
    setPassword(e.target.value);
  }
  function _confirmPassword(e) {
    setConfirmPassword(e.target.value);
  }

  function checkPassword(value) {
    return password === value ? true : "Passwords not match";
  }
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="userName"
          placeholder="User Name"
          className="input"
          {...register("userName", {
            required: "Field is required",
            minLength: { value: 4, message: "Min 4 symbols" },
            value: userName,
            onChange: (e) => {
              _userName(e);
            },
          })}
        />
        {errors.userName && <p style={{ color: "red" }}>{errors.userName.message}</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input"
          {...register("password", {
            required: "Field is required",
            minLength: { value: 5, message: "Min 5 symbols" },
            value: password,
            onChange: (e) => {
              _password(e);
            },
          })}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="input"
          {...register("confirmPassword", {
            validate: checkPassword,
            value: confirmPassword,
            onChange: (e) => {
              _confirmPassword(e);
            },
          })}
        />
        {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>}
        <button className="btn">Sign Up</button>
      </form>
    </section>
  );
}
