import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import modalStyle from "./modal.scss";
import { observer } from "mobx-react";
import { useStores } from "../../stores/MainStore";

const EditModal = observer((props) => {
  const { EditStore } = useStores();
  const { isShow, onClose: setEditShow } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  function handleClose() {
    setEditShow(false);
  }

  return (
    <Modal show={isShow}>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>Edit Me</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(EditStore.onSubmit)}>
        <Modal.Body>
          <TextField
            type="text"
            id="outlined-normal"
            label="username"
            fullWidth
            {...register("username", {
              value: EditStore.newUsername,
              onChange: (e) => {
                EditStore.setNewUsername(e.target.value);
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
              value: EditStore.newFullname,
              onChange: (e) => {
                EditStore.setNewFullname(e.target.value);
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
              value: EditStore.newAvatar,
              onChange: (e) => {
                EditStore.setNewAvatar(e.target.value);
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
              value: EditStore.newAge,
              onChange: (e) => {
                EditStore.setNewAge(e.target.value);
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
              value: EditStore.newBio,
              onChange: (e) => {
                EditStore.setNewBio(e.target.value);
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
