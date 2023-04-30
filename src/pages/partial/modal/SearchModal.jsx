import React, { useState, useEffect } from "react";
import { useForm }                    from "react-hook-form";
import modalStyle                     from "./modal.scss";
import { ListItem, ListItemAvatar, ListItemText, Avatar, ListItemButton } from '@mui/material';
// // import ModalDialog                  from '@mui/joy/ModalDialog';
// import Modal                        from '@mui/joy/Modal';
import { Modal, Button }        from "react-bootstrap";
import CloseIcon from '@mui/icons-material/Close';
import { observer }                   from "mobx-react";
import { useStores }                  from "../../../stores/MainStore";
import { useNavigate }                from "react-router-dom/dist";

const SearchModal = observer(() => {
  const { RequestsStore, ConfigStore } = useStores();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const {} = useForm({ mode: "onChange" });

  function handleClose() {
    ConfigStore.setIsShowSearchModal(false);
  }

  const filteredUsers = users.filter((person) => {
    return (
      person.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (person.fullName &&
        person.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  useEffect(() => {
    new Promise((resolve, rejects) => {
      resolve();
    })
      .then(() => {
        return RequestsStore.doGet(ConfigStore.url + "/users");
      })
      .then((users) => {
        if (users === "Forbidden") {
          ConfigStore.setErr("Token has been burned");
          ConfigStore.setIsShow(true);
        } else {
          setUsers(users);
        }
      });
  }, []);

  const toUser = (username) => {
    handleClose();
    navigate(`/user/${username}`);
  };

  return (
    <>
     {/* <Modal open={ConfigStore.isShowSearchModal} className="search" onClose={handleClose}>
  <div className="search">
    <ModalDialog
      variant="outlined"
      className="dialog"
      role="alertdialog"
      aria-labelledby="alert-dialog-modal-title"
      aria-describedby="alert-dialog-modal-description"
    >
      <TextField type="text" onChange={handleSearch} />
      <span className="cross" onClick={handleClose}><CloseIcon /></span>

      <List>
        {filteredUsers.slice(0, 5).map((person) => {
          const labelId = `checkbox-list-secondary-label-${person._id}`;

          return (
            <ListItem key={person._id} secondaryAction={<Button className="follow" id={person.username}>Follow</Button>} disablePadding>
              <ListItemButton onClick={() => toUser(person.username)}>
                <ListItemAvatar>
                  <Avatar alt="" src={person.avatar} />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={person.username} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </ModalDialog>
  </div>
</Modal> */}
      <Modal show={ConfigStore.isShowSearchModal} className="search" onHide={handleClose}>
        <Modal.Header closeButton>
          <input type="text" onChange={handleSearch} />
        </Modal.Header>
        {filteredUsers.slice(0, 5).map((person) => {
          const labelId = `checkbox-list-secondary-label-${person._id}`;
          return (
            <ListItem
              key={person._id}
              secondaryAction={<Button className="follow" id={person.username}>Follow</Button>}
              disablePadding
            >
              <ListItemButton onClick = {() => toUser(person.username)}>
                <ListItemAvatar>
                  <Avatar alt="" src={person.avatar} />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={person.username} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </Modal>
    </>
  );
});

export default SearchModal;
