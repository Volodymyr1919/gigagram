import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
// eslint-disable-next-line no-unused-vars
// import modalStyle from "./modal.scss";

export default function ModalWindow(props) {

  const { isShow, onClose: setShow } = props;
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newVideo, setNewVideo] = useState("");
  const [reqMedia, setReqMedia] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  function handleClose() {
    setShow(false);
  }

  const onSubmit = async (data) => {
    if (!data.image && !data.video) {
      return setReqMedia("Image or Video Field is required");
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        image: data.image,
        video: data.video,
        status: "active",
      }),
    };

    fetch("http://65.109.13.139:9191/post", requestOptions)
      .then((data) => {
        return data.json()
      })
      .then((data) => {
        console.log(data);
      })
  };
  return (
    <Modal show={isShow}>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>Add post</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <input
            type="text"
            placeholder="Title"
            {...register("title", {
              required: "The field is required",
              value: newTitle,
              onChange: (e) => {
                setNewTitle(e.target.value);
              },
            })}
          />
          <p>{errors.title && errors.title.message}</p>
          <input
            type="text"
            placeholder="Description"
            {...register("description", {
              required: "The field is required",
              value: newDescription,
              onChange: (e) => {
                setNewDescription(e.target.value);
              },
            })}
          />
          <p>{errors.description && errors.description.message}</p>
          <input
            type="url"
            placeholder="Image"
            {...register("image", {
              value: newImg,
              onChange: (e) => {
                setNewImg(e.target.value);
              },
            })}
          />
          <p>{reqMedia}</p>
          <input
            type="url"
            placeholder="Video"
            {...register("video", {
              value: newVideo,
              onChange: (e) => {
                setNewVideo(e.target.value);
              },
            })}
          />
          <p>{reqMedia}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="submit">
            Add
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}