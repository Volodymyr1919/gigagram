import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button } from 'react-bootstrap';

export default function ModalWindow(props) {

    const [isShow, setShow] = useState(props.isShow);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newImg, setNewImg] = useState("");
    const [newVideo, setNewVideo] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ mode: "onChange" });

    function handleClose() {
        setShow(false);
    };

    const onSubmit = async (data) => {
        console.log("User data", data);
        if(!data.img || !data.video){
            errors.media = "Image or Video Field is required";
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                    "title": data.newTitle,
                    "description": data.newDescription,
                    "image": data.newImg,
                    "video": data.newVideo
            })
        };
        console.log(requestOptions);

        // await fetch('http://65.109.13.139:9191/signin', requestOptions)
        // .then(async response => {
        //         const isJson = response.headers.get('content-type')?.includes('application/json');
        //         const data = isJson && await response.json();
        //         console.log(data);
        //         localStorage.setItem("token", data.token);
        //         localStorage.setItem("user_id", data.id);
    
        //         // check for error response
        //         if (!response.ok) {
        //             // get error message from body or default to response status
        //             const error = (data && data.message) || response.status;
        //             return Promise.reject(error);
        //         }
        //     })
        //     .catch(error => {
        //         console.error('There was an error!', error);
        //     });
        }
    return (
        <div>
            <Modal show={isShow}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <input 
                            type="text" 
                            placeholder='Title'
                            {...register("title", {
                                required: "The field is required",
                                value: newTitle,
                                onChange: (e) => {
                                    setNewTitle(e.target.value);
                                }
                            })}/>
                            <p>{errors.title}</p>
                        <input 
                            type="text" 
                            placeholder='Description'
                            {...register("description", {
                                required: "The field is required",
                                value: newDescription,
                                onChange: (e) => {
                                    setNewDescription(e.target.value);
                                }
                            })}/>
                            <p>{errors.description}</p>
                        <input  
                            type="url" 
                            placeholder='Image'
                            {...register("img", {
                                value: newImg,
                                onChange: (e) => {
                                    setNewImg(e.target.value);
                                }
                            })}/> 
                            <p>{errors.media}</p>
                        <input  
                            type="url" 
                            placeholder='Video'
                            {...register("video", {
                                value: newVideo,
                                onChange: (e) => {
                                    setNewVideo(e.target.value);
                                }
                            })}/>
                            <p>{errors.media}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>OK</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}