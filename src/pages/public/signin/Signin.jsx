import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button }    from 'react-bootstrap';
import { useNavigate }      from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import signInStyle from './signin.scss';

export default function Signin() {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ mode: "onChange" });

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [resp, setResp] = useState("");

    const navigate = useNavigate();

    const onSubmit = async (data) => {
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

        await fetch('http://65.109.13.139:9191/signin', requestOptions)
        // .then(async response => {
        //     const isJson = response.headers.get('content-type')?.includes('application/json');
        //     const data = isJson && await response.json();
        //     console.log(data);
        //     localStorage.setItem("token", data.token);
        //     localStorage.setItem("user_id", data.id);

        //     // check for error response
        //     if (!response.ok) {
        //         // get error message from body or default to response status
        //         const error = (data && data.message) || response.status;
        //         return Promise.reject(error);
        //     }
        // })
        // .catch(error => {
        //     console.error('There was an error!', error);
        // });
        .then((data) => {
            if (data.ok) {
                return data.json();
            } else {
                setShow(true);
                data.statusText === "Bad Request" ? setResp("Wrong username or password") : setResp(data.statusText);
                // setResp(data.statusText);
            }
        })
        .then((data) => {
            if (data) {
                localStorage.setItem('token', data.token);
                navigate("/feed");
            } else {
                return;
            }
        })
    }

    function handleClose() {
        setShow(false);
    };

    return (
        <div className="signin">
            <div className="screen">
                <div className="screen__content">
                    <form className="login" onSubmit={handleSubmit(onSubmit)}>
                        <div className="login__field">
                            <input className="login__input" 
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
                                })}/>
                            <p>{errors.username && errors.username.message}</p>
                        </div>
                        <div className="login__field">
                            <input className="login__input" 
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
                                })}/>
                            <p>{errors.password && errors.password.message}</p>
                        </div>
                        <button className="button login__submit"type='submit'>
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
            <Modal show={show}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {resp}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>OK</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};