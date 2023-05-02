import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useStores } from "../../../stores/MainStore";
import { useNavigate } from "react-router-dom";
import followersStyle from "./followers.scss";
import { Avatar } from "@mui/material";

const Followers = observer((props) => {

  const { username } = props;

  const { RequestsStore, ConfigStore } = useStores();

  const [followers, setFollowers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if(username !== undefined ) {
      new Promise((resolve, rejects) => {
        resolve();
      })
      .then(() => {
        return RequestsStore.doGet(ConfigStore.url + "/followers/" + username);
      })
      .then((foll) => {
        if (foll === "Forbidden") {
          ConfigStore.setErr("Token has been burned");
          ConfigStore.setIsShow(true);
        } else {
          setFollowers(foll.followers);
        }
      })
    } else {
      return;
    }
  }, [username]);

  function handleClose() {
    ConfigStore.setIsShowFollowers(false);
  }

  const toUser = (username) => {
    handleClose();
    navigate(`/user/${username}`);
  };

  return (
    <Modal show={ConfigStore.isShowFollowers} className="followers" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Followers</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul className="list">
          { followers === "Not Found" ?
              <div className="loader">Loading...</div>
              :
              followers.map((arrayF) => (
                <li
                  key={arrayF._id}
                  ng-repeat="user in ctrl.users"
                  className="list-item"
                >
                  <div className="list-item-image">
                    <Avatar src={arrayF.avatar} className="image__item" alt="" />
                  </div>
                  <div className="list-item-content">
                    <p>{arrayF.username}</p>
                  </div>
                  <Button style={{background: "#F47A1D", border: "none", margin: "2em", float: "right" }} onClick={() => toUser(arrayF.username)}>GO TO</Button>
                </li>
              ))
          }
        </ul>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={handleClose} style={{background: "#F47A1D", border: "none"}}>Close</Button>
    </Modal.Footer>
    </Modal>
  );
})
export default Followers