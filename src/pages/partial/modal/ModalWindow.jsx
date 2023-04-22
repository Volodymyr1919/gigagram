import React, { useState }      from "react";
import { useForm }              from "react-hook-form";
import { Modal, Button }        from "react-bootstrap";
import TextField                from '@mui/material/TextField';
import modalStyle               from "./modal.scss";
import { observer }             from "mobx-react";
import { useStores }            from "../../../stores/MainStore";
import Success                  from "../Success";

const ModalWindow = observer((props) => {
  const { RequestsStore, ConfigStore } = useStores();

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newVideo, setNewVideo] = useState("");
  const [reqMedia, setReqMedia] = useState("");
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  function handleClose() {
    ConfigStore.setIsShowModalWindow(false);
  }

  const onSubmit = async (data) => {
    if (!data.image && !data.video) {
      return setReqMedia("Image or Video Field is required");
    }

    const resp = RequestsStore.doPost(ConfigStore.url + "/post", {
        title: data.title,
        description: data.description,
        image: data.image,
        video: data.video,
        status: "active"
    })
    .then(() => {
      ConfigStore.setUpdatePosts(true)
      setOpen(true)
    })
    console.log(resp);
  };
  
  return (
    <>
      <Modal show={ConfigStore.isShowModalWindow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add post</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit((data) => {onSubmit(data); handleClose()})}>
          <Modal.Body>
            <TextField
              type="text"
              id="outlined-normal"
              label="Title"
              fullWidth
              {...register("title", {
                required: "The field is required",
                value: newTitle,
                onChange: (e) => {
                  setNewTitle(e.target.value);
                },
              })}
            />
            <p className="validError">{errors.title && errors.title.message}</p>
            <TextField
              type="text"
              id="outlined-normal"
              label="Description"
              fullWidth
              {...register("description", {
                required: "The field is required",
                value: newDescription,
                onChange: (e) => {
                  setNewDescription(e.target.value);
                },
              })}
            />
            <p className="validError">{errors.description && errors.description.message}</p>
            <TextField
              type="url"
              id="outlined-normal"
              label="Image"
              fullWidth
              {...register("image", {
                value: newImg,
                onChange: (e) => {
                  setNewImg(e.target.value);
                },
              })}
            />
            <p className="validError">{reqMedia}</p>
            <TextField
              type="url"
              id="outlined-normal"
              label="Video"
              fullWidth
              {...register("video", {
                value: newVideo,
                onChange: (e) => {
                  setNewVideo(e.target.value);
                },
              })}
            />
            <p className="validError">{reqMedia}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="edit-btn" type="submit">
              Add
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <Success open={open} setOpen={setOpen}/>
    </>
  );
});

export default ModalWindow;