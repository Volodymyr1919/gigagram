import React, { useState, useEffect } from "react";
import { useForm }                    from "react-hook-form";
import { Modal, Button }              from "react-bootstrap";
import TextField                      from "@mui/material/TextField";
import modalStyle                     from "./modal.scss";
import { observer }                   from "mobx-react";
import { useStores }                  from "../../../stores/MainStore";
import Success                        from "../Success";

const EditModal = observer((props) => {
  const { RequestsStore, ConfigStore } = useStores();

  const { me } = props;
  
  const [newUsername, setNewUsername] = useState();
  const [newFullname, setNewFullname] = useState();
  const [newAvatar, setNewAvatar] = useState();
  const [newAge, setNewAge] = useState();
  const [newBio, setNewBio] = useState();
  const [open, setOpen] = useState(false); 
  const {
    register,
    setError,
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
      return response.json()
    })
    .then((response) => {
      if(response.errors) {
        console.log("resp",response)
        setError('username', { type: 'custom', message: 'This username is already taken' });
      }
      else{
        ConfigStore.setUpdateMe(true);
        setOpen(true)
        handleClose();
      }
    });
  };

  function handleClose() {
    ConfigStore.setIsShowEditModal(false);
  }

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
              {...register("bio")}
                defaultValue={me.bio}
                onChange={(e) => setNewBio(e.target.value)}
            />
            <p className="validError">{errors.bio && errors.age.bio}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="edit-btn" type="submit">
              Edit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <Success open={open} setOpen={setOpen}/>
    </>
  );
});
export default EditModal;
