import React, { useState }  from 'react';
import { useForm }          from 'react-hook-form';
import { Modal, Button }    from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Signin() {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ mode: "onChange" });

    const [username, setUsername]   = useState("");
    const [password, setPassword]   = useState("");
    const [show, setShow]           = useState(false);
    const [resp, setResp]           = useState("");

    const navigate = useNavigate();

    const onSubmit = async (data) => {

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
                console.log(data);
                localStorage.setItem('token', data.token);
                navigate("/feed");
            } else {
                return;
            }
        })
    };

    function handleClose() {
        setShow(false);
    };

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
                            message: "Username is min 4 symbols"
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