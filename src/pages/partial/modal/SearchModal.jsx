import React, { useState, useEffect } from "react";
import { useForm }                    from "react-hook-form";
import modalStyle                     from "./modal.scss";
import { Modal, Button }              from "react-bootstrap";
import { observer }                   from "mobx-react";
import { useStores }                  from "../../../stores/MainStore";
import { useNavigate }                from "react-router-dom/dist";
import { ListItem, ListItemAvatar, ListItemText, Avatar, ListItemButton } from '@mui/material';

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
      <Modal show={ConfigStore.isShowSearchModal} className="modals" onHide={handleClose}>
        <div className="search">
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
        </div>
      </Modal>
    </>
  );
});

export default SearchModal;
