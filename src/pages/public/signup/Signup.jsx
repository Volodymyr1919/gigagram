import React, { useState }      from "react";
import ErrorModal               from "../../partial/ErrorModal";
import { useForm }              from "react-hook-form";
import { useNavigate }          from "react-router-dom";
import { observer }             from "mobx-react";
import { NavLink }              from "react-router-dom";
import { useStores }            from "../../../stores/MainStore";
// eslint-disable-next-line no-unused-vars
import signUpStyle              from "./signup.scss";
import Button                   from '@mui/material/Button';
import BgSign from "../../../backgrounds/BgSign";

 const SignUp = observer(() => {

    const { RequestsStore, ConfigStore } = useStores();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ mode: "onChange" });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data);
        const token = await RequestsStore.doPost(ConfigStore.url + "/signup", {
          username: data.username,
          password: data.password,
          confirm_password: data.confirmPassword
        });
        if (token.jwt) {
          ConfigStore.setToken(token.jwt);
          localStorage.setItem("token", token.jwt);
          navigate("/feed");
        } else {
          ConfigStore.setErr(token);
          ConfigStore.setIsShow(true);
        }
    };

    function checkPassword(value) {
        return password === value ? true : "Passwords not match";
    }

    return(
        <div className="signup">
            <BgSign />
            <div className="screen">
                <div className="screen__content">
                    <h5>Sign Up</h5>
                    <form className="registration" onSubmit={handleSubmit(onSubmit)}>
                        <div className="registration__field">
                            <i className="bi bi-person-fill"></i>
                            <input
                                type="email"
                                name="username"
                                placeholder="E-Mail"
                                className="registration__input"
                                {...register("username", {
                                    required: "Field is required",
                                    minLength: { value: 8, message: "Min 8 symbols" },
                                    pattern: { value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, message: "Invalid email address"},
                                    value: username,
                                    onChange: (e) => {
                                    setUsername(e.target.value);
                                    },
                                })}
                            />
                        <p className='validError'>{errors.username && errors.username.message}</p>
                    </div>
                    <div className="registration__field">
                        <i className="bi bi-lock-fill"></i>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="registration__input"
                            {...register("password", {
                                required: "Field is required",
                                minLength: { value: 8, message: "Min 8 symbols" },
                                pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, message: "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"},
                                value: password,
                                onChange: (e) => {
                                    setPassword(e.target.value);
                                },
                            })}
                        />
                        <p className='validError'>{errors.password && errors.password.message}</p>
                    </div>
                    <div className="registration__field">
                        <i className="bi bi-lock-fill"></i>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="registration__input"
                            {...register("confirmPassword", {
                                validate: checkPassword,
                                value: confirmPassword,
                                onChange: (e) => {
                                    setConfirmPassword(e.target.value);
                                },
                            })}
                        />
                        <p className='validError'>{errors.confirmPassword && errors.confirmPassword.message}</p>
                    </div>
                    <Button className="button registration__submit"type='submit'>
                        <span className="button__text">Sign Up</span>
                    </Button> 
                    <Button size="small" component={NavLink} to="/signin" style={{marginTop: "20%", color: "#000000"}} className="line-btn">Or Sign In</Button> 
                    </form>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>    
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1r"></span>
                </div> 
            </div>
            {/* <ul className="bg-bubbles">
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
            </ul> */}
            <ErrorModal />
        </div>
    )
})
export default SignUp