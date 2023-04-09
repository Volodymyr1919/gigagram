import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import modalStyle from "./modal.scss";
import { observer } from "mobx-react";
import { useStores } from "../../stores/MainStore";

const EditModal = observer(() => {

  const { EditStore, RequestsStore, ConfigStore } = useStores();

  const [newUsername, setNewUsername] = useState("");
  const [newFullname, setNewFullname] = useState("");
  const [newAvatar, setNewAvatar] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newBio, setNewBio] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    const result = RequestsStore.doPut(ConfigStore.url + "/me", {
      "username": data.username,
      "avatar": data.avatar,
      "age": data.age,
      "bio": data.bio,
      "fullName": data.fullname
    })
    console.log(result);
  }

  function handleClose() {
    ConfigStore.setIsShowEditModal(false);
  }

  return (
    <Modal show={ConfigStore.isShowEditModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Me</Modal.Title>
      </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <TextField
              type="text"
              id="outlined-normal"
              label="username"
              fullWidth
              {...register("username", {
                value: newUsername,
                onChange: (e) => {
                  setNewUsername(e.target.value);
                },
              })}
            />
            <p className="validError">
              {errors.username && errors.title.message}
            </p>
            <TextField
              type="url"
              id="outlined-normal"
              label="fullname"
              fullWidth
              {...register("fullname", {
                value: newFullname,
                onChange: (e) => {
                  setNewFullname(e.target.value);
                },
              })}
            />
            <p className="validError">
              {errors.fullname && errors.fullname.message}
            </p>
            <TextField
              type="text"
              id="outlined-normal"
              label="avatar"
              fullWidth
              {...register("avatar", {
                pattern: {
                  value: /^(http|https):\/\/[^\s/$.?#].[^\s]*$/,
                  message: "Invalid link",
                },
                value: newAvatar,
                onChange: (e) => {
                  setNewAvatar(e.target.value);
                },
              })}
            />
            <p className="validError">{errors.avatar && errors.avatar.message}</p>
            <TextField
              type="number"
              id="outlined-normal"
              label="age"
              fullWidth
              {...register("age", {
                value: newAge,
                onChange: (e) => {
                  setNewAge(e.target.value);
                },
              })}
            />
            <p className="validError">{errors.age && errors.age.message}</p>
            <TextField
              type="text"
              id="outlined-normal"
              label="bio"
              fullWidth
              {...register("bio", {
                value: newBio,
                onChange: (e) => {
                  setNewBio(e.target.value);
                },
              })}
            />
            <p className="validError">{errors.bio && errors.age.bio}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="submit">
              Edit
            </Button>
          </Modal.Footer>
        </form>
    </Modal>
  );
});
export default EditModal;
