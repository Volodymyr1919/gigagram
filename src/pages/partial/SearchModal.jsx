import React, { useState, useEffect } from "react";
import { useForm }                    from "react-hook-form";
import { Modal, Button, ModalBody }   from "react-bootstrap";
import modalStyle                     from "./modal.scss";
import Avatar                         from "@mui/material/Avatar";
import ListItem                       from "@mui/material/ListItem";
import ListItemButton                 from "@mui/material/ListItemButton";
import ListItemText                   from "@mui/material/ListItemText";
import ListItemAvatar                 from "@mui/material/ListItemAvatar";
import { observer } from "mobx-react";
import { useStores } from "../../stores/MainStore";

const SearchModal = observer((props) => {
  const { RequestsStore, ConfigStore } = useStores();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
        setUsers(users);
        console.log(users);
      });
  }, []);

  return (
    <>
      <Modal show={ConfigStore.isShowSearchModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search</Modal.Title>
        </Modal.Header>

        <input type="text" onChange={handleSearch} />
        {filteredUsers.slice(0, 5).map((person) => {
          const labelId = `checkbox-list-secondary-label-${person._id}`;
          return (
            <ListItem
              key={person._id}
              secondaryAction={<Button id={person.username}>Follow</Button>}
              disablePadding
            >
              <ListItemButton>
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
