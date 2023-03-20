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
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username": data.userName,
                "password": data.password,
                "confirm_password": data.confirmPassword
              })
        };
        fetch('http://65.109.13.139:9191/signup', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
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
            .catch(error => {
                console.error('There was an error!', error);
            });
      };

      const [userName, setUserName] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
    
      function checkPassword(value) {
        return password === value ? true : "Passwords not match";
      }
    return(
        <form className="container" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="heading alt">Sign Up</h2>
            <input
            type="email"
            name="userName"
            placeholder="E-Mail"
            className="input"
            {...register("userName", {
                required: "Field is required",
                minLength: { value: 8, message: "Min 8 symbols" },
                pattern: { value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, message: "Invalid email address"},
                value: userName,
                onChange: (e) => {
                    setUserName(e.target.value);
                },
            })}
            />
        <p>{errors.userName && errors.userName.message}</p>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input"
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
        <p>{errors.password && errors.password.message}</p>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="input"
          {...register("confirmPassword", {
            validate: checkPassword,
            value: confirmPassword,
            onChange: (e) => {
                setConfirmPassword(e.target.value);
            },
          })}
        />
        <p>{errors.confirmPassword && errors.confirmPassword.message}</p>
        <button className="btn">Sign Up</button>
        </form>
    )
}