import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { NavLink } from "react-router-dom";
import { useStores } from "../../../stores/MainStore";
// eslint-disable-next-line no-unused-vars
import signUpStyle from "./signup.scss";
import Button from '@mui/material/Button';

 const SignUp = observer(() => {

    const { SignupStore } = useStores();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ mode: "onChange" });
      const navigate = useNavigate();
      
      async function onSubmit(data) {
        const success = await SignupStore.onSubmit();
        if (success) {
          navigate("/feed");
        }
      }

      function checkPassword(value) {
        return SignupStore.password === value ? true : "Passwords not match";
      }

    return(
        <div className="signup">
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
                            {...register("userName", {
                                required: "Field is required",
                                minLength: { value: 8, message: "Min 8 symbols" },
                                pattern: { value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, message: "Invalid email address"},
                                value: SignupStore.username,
                                onChange: (e) => {
                                  SignupStore.setUsername(e.target.value);
                                },
                              })}
                            />
                        <p className='validError'>{errors.userName && errors.userName.message}</p>
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
                            value: SignupStore.password,
                            onChange: (e) => {
                                SignupStore.setPassword(e.target.value);
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
                            value: SignupStore.confirmPassword,
                            onChange: (e) => {
                                SignupStore.setConfirmPassword(e.target.value);
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
        </div>
    )
})
export default SignUp