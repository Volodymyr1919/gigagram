import React, { useState, useEffect } from "react";
import { useForm }                    from "react-hook-form";
import { Modal, Button }              from "react-bootstrap";
import TextField                      from "@mui/material/TextField";
import modalStyle                     from "./modal.scss";
import { observer }                   from "mobx-react";
import { useStores }                  from "../../../stores/MainStore";
import Success                        from "../Success";
import ChildModal                     from "./ChildModal";
const EditModal = observer((props) => {
  const { RequestsStore, ConfigStore } = useStores();

  const { me } = props;
  
  const [newUsername, setNewUsername] = useState();
  const [newFullname, setNewFullname] = useState();
  const [newAvatar, setNewAvatar] = useState();
  const [newAge, setNewAge] = useState();
  const [newBio, setNewBio] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    RequestsStore.doPut(ConfigStore.url + "/me", {
      username: data.username,
      avatar: data.avatar,
      age: data.age,
      bio: data.bio,
      fullName: data.fullname,
    })
    .then((response) => {
      if(response._id) {
        handleClose();
        ConfigStore.setUpdateMe(true);
        ConfigStore.setSnackSeverity("success");
        ConfigStore.setSnackText("Updated successfully!");
        ConfigStore.setIsShowSnack(true);
      }
      else{
        ConfigStore.setSnackSeverity("error");
        response.status === 400 ? ConfigStore.setSnackText("Username has been taken already") : ConfigStore.setSnackText(response.statusText);
        ConfigStore.setIsShowSnack(true);
      }
    });
  };

  function handleClose() {
    ConfigStore.setIsShowEditModal(false);
  };

  return (
    <>
      <Modal className="modals" show={ConfigStore.isShowEditModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Me</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
          })}
        >
          <Modal.Body>
            <TextField
              type="text"
              id="outlined-normal"
              label="username"
              fullWidth
              {...register("username")}
              size="small"
              defaultValue={me.username}
              onChange={(e) => setNewUsername(e.target.value)}
            />

            <p className="validError">
              {errors.username && errors.username.message}
            </p>
            <TextField
              type="text"
              id="outlined-normal"
              label="fullname"
              fullWidth
              size="small"
              {...register("fullname")}
                defaultValue={me.fullName}
                onChange={(e) => setNewFullname(e.target.value)}
            />
            <p className="validError">
              {errors.fullname && errors.fullname.message}
            </p>
              <TextField
                type="url"
                id="outlined-normal"
                label="avatar"
                fullWidth
                size="small"
                {...register("avatar", {
                  pattern: {
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
              size="small"
              {...register("age")}
                defaultValue={me.age}
                onChange={(e) => setNewAge(e.target.value)}
            />
            <p className="validError">{errors.age && errors.age.message}</p>
            <TextField
              type="text"
              id="outlined-normal"
              label="bio"
              fullWidth
              size="small"
              {...register("bio")}
                defaultValue={me.bio}
                onChange={(e) => setNewBio(e.target.value)}
            />
            <p className="validError">{errors.bio && errors.age.bio}</p>
          </Modal.Body>
          <Modal.Footer>
          <ChildModal />
            <Button variant="secondary" className="edit-btn" type="submit">
              Edit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <Success />
    </>
  );
});
export default EditModal;
