import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Signin() {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ mode: "onChange" });

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (data) => {
        console.log("User data", data);

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": data.username,
                "password": data.password
            })
        };

        fetch('http://65.109.13.139:9191/signin', requestOptions)
        .then((data) => {
            data.json()
        })
        .then((data) => {
            console.log(data);
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    name='username'
                    placeholder='Username'
                    {...register("username", {
                        required: "The field is required",
                        minLength: {
                            value: 4,
                            message: "Usernema is min 4 symbols"
                        },
                        value: username,
                        onChange: (e) => {
                            setUsername(e.target.value);
                        }
                    })}
                />
                <p>{errors.username && errors.username.message}</p>
                <input
                    type="password"
                    name='password'
                    placeholder='Password'
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 4,
                            message: 'Password should be min 4 symbols'
                        },
                        value: password,
                        onChange: (e) => {
                            setPassword(e.target.value);
                        }
                    })}
                />
                <p>{errors.password && errors.password.message}</p>
                <button type='submit'>Sign In</button>
            </form>
        </div>
    )
};