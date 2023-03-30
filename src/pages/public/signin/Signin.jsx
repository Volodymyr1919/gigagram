import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../partial/ErrorModal";
import { observer } from "mobx-react";
import SigninStore from "../../../stores/publicStores/SigninStore";
// eslint-disable-next-line no-unused-vars
import signInStyle from "./signin.scss";

const Signin = observer(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("User data", data);
    const token = await SigninStore.signIn(data.username, data.password);
    if (token) {
      localStorage.setItem("token", token);
      navigate("/feed");
    }
  };

  function handleClose() {
    SigninStore.setShow(false);
  }

  return (
    <div className="signin">
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={handleSubmit(onSubmit)}>
            <div className="login__field">
              <input
                className="login__input"
                type="text"
                name="username"
                placeholder="Username"
                {...register("username", {
                  required: "The field is required",
                  minLength: {
                    value: 4,
                    message: "Usernema is min 4 symbols",
                  },
                  value: SigninStore.username,
                  onChange: (e) => {
                    SigninStore.setUsername(e.target.value);
                  },
                })}
              />
              <p>{errors.username && errors.username.message}</p>
            </div>
            <div className="login__field">
              <input
                className="login__input"
                type="password"
                name="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Password should be min 4 symbols",
                  },
                  value: SigninStore.password,
                  onChange: (e) => {
                    SigninStore.setPassword(e.target.value);
                  },
                })}
              />
              <p>{errors.password && errors.password.message}</p>
            </div>
            <button className="button login__submit" type="submit">
              <span className="button__text">Sign In</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
      <ul className="bg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <ErrorModal
        isShow={SigninStore.isShow}
        setShow={SigninStore.setShow}
        err={SigninStore.err}
        onClose={handleClose}
      />
    </div>
  );
});
export default Signin;
