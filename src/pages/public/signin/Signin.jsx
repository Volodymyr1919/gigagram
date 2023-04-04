import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import ErrorModal from "../../partial/ErrorModal";
import { observer } from "mobx-react";
import SigninStore from "../../../stores/publicStores/SigninStore";
// eslint-disable-next-line no-unused-vars
import signInStyle from "./signin.scss";
import Button from '@mui/material/Button';
import styled from 'styled-components';

const Signin = observer(() => {

  // const GoToSignin = styled.div`
    //     background-color: ${(props) => (props.$background ? "red" : "white")};
    //     width: 100px;
    //     height: 100px;
    // `;

    // const style = {
    //     signin: {
    //         background: "#599fe3"
    //     },
    //     screen: {
    //         background: "yellow"
    //     }
    // };

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
          <h5>Sign In</h5>
          <form className="login" onSubmit={handleSubmit(onSubmit)}>
            <div className="login__field">
              <i className="bi bi-person-fill"></i>
              <input
                className="login__input"
                type="text"
                name="username"
                placeholder="Username"
                {...register("username", {
                  required: "The field is required",
                  minLength: {
                    value: 4,
                    message: "Username is min 4 symbols",
                  },
                  value: SigninStore.username,
                  onChange: (e) => {
                    SigninStore.setUsername(e.target.value);
                  },
                })}
              />
              <p className='validError'>{errors.username && errors.username.message}</p>
            </div>
            <div className="login__field">
              <i className="bi bi-lock-fill"></i>
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
              <p className='validError'>{errors.password && errors.password.message}</p>
            </div>
            <Button className="button login__submit"type='submit'>
                <span className="button__text">Sign In</span>
            </Button>
            <Button size="small" component={NavLink} to="/signup" style={{marginTop: "20%", color: "#000000"}} className="line-btn">Or Sign Up</Button> 
            <Button size="small" component={NavLink} to="/forgot" style={{marginTop: "20%", marginLeft: "15%", color: "#000000"}} className="line-btn">Forgot Password?</Button>
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
