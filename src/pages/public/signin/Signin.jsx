import React, { useState }          from "react";
import { useForm }                  from "react-hook-form";
import { useNavigate }              from "react-router-dom";
import { NavLink }                  from "react-router-dom";
import ErrorModal                   from "../../partial/ErrorModal";
import { observer }                 from "mobx-react";
import { useStores }                from "../../../stores/MainStore";
// eslint-disable-next-line no-unused-vars
import signInStyle                  from "./signin.scss";
import Button                       from '@mui/material/Button';
import BgSign from "../../../backgrounds/BgSign";

const Signin = observer(() => {

  const { RequestsStore, ConfigStore } = useStores();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const resp = await RequestsStore.doPost(ConfigStore.url + "/signin", {
      username: data.username,
      password: data.password
    });
    if (resp.token) {
      localStorage.setItem("token", resp.token);
      navigate("/feed");
    } else {
      ConfigStore.setErr(resp);
      ConfigStore.setIsShow(true);
    }
  };

  return (
    <div className="signin">
       <BgSign />
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
                  value: username,
                  onChange: (e) => {
                    setUsername(e.target.value);
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
                  value: password,
                  onChange: (e) => {
                    setPassword(e.target.value);
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
      <ErrorModal />
    </div>
  );
});
export default Signin;
