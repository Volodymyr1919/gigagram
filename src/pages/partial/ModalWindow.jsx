import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button } from 'react-bootstrap';
import modalStyle from './modal.scss'

export default function ModalWindow(props) {
    // const {post, setPost} = useState("")
    const { isShow, onClose: setShow } = props;
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
              title: newTitle,
              description: newDescription,
              image: newImg,
              video: newVideo,
              status: "active"
            })
          };
          
          try {
            const response = await fetch("http://65.109.13.139:9191/post", requestOptions);
            if (response.ok) {
              console.log("Post created successfully");
              setShow(false);
            } else {
              console.log("Failed to create post");
            }
          } catch (error) {
            console.log("Error:", error);
          }
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
                            {errors.title && <p>{errors.title.message}</p>}
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
                            {errors.description && <p>{errors.description.message}</p>}
                        <input  
                            type="url" 
                            placeholder='Image'
                            {...register("image", {
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
                            {errors.media && <p>{errors.description.media}</p>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" type="submit" onClick={handleClose}>OK</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}