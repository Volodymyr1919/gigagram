import React, { useState, useEffect } from "react";
import { useForm }                    from "react-hook-form";
import { Modal, Button, ModalBody }   from "react-bootstrap";
import modalStyle                     from "./modal.scss";
import { Avatar, ListItem, ListItemButton, ListItemText, ListItemAvatar, TextField, InputAdornment } from "@mui/material/";
import { observer }                   from "mobx-react";
import { useStores }                  from "../../../stores/MainStore";
import { useNavigate }                from "react-router-dom/dist";
// Здесь импорт иконки для поля ввода поиска пользователя
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

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
      <Modal show={ConfigStore.isShowSearchModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search</Modal.Title>
        </Modal.Header>

        <TextField 
          onChange={handleSearch}
          size='small'
          fullWidth
          id="input-with-icon-textfield"
          placeholder="Username"
          multiline
          variant="standard"
          // Здесь использование иконки для поля ввода поиска пользователя
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" style={{ margin: 0, marginRight: "5px" }}>
                <PersonSearchIcon />
              </InputAdornment>
            ),
          }}
          style={{
            marginBottom: "10px"
          }}
        />
        {filteredUsers.slice(0, 5).map((person) => {
          const labelId = `checkbox-list-secondary-label-${person._id}`;
          return (
            <ListItem
              key={person._id}
              secondaryAction={<Button onClick = {() => toUser(person.username)} className="edit-btn" >GO TO</Button>}
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
