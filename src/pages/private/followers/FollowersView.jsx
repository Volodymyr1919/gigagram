import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useStores } from "../../../stores/MainStore";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import followersStyle from "./followers.scss";

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

  const followUser = (username) => {
    RequestsStore.doPost(ConfigStore.url + "/follow", {
      username: username
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <Modal show={ConfigStore.isShowFollowers} className="followers" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Followers</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul className="list">
          { followers === undefined ?
              <div className="loader">Loading...</div>
              :
              followers.map((arrayF) => (
                <li
                  key={arrayF._id}
                  ng-repeat="user in ctrl.users"
                  className="list-item"
                >
                  <div onClick={() => navigate(`/user/${arrayF.username}`)}>
                    <img src={arrayF.avatar} className="list-item-image" alt="" />
                  </div>
                  <div className="list-item-content">
                    <h4>{arrayF.fullName}</h4>
                    <p>{arrayF.username}</p>
                  </div>
                  <Button style={{background: "#F47A1D", border: "none", margin: "2em", marginLeft: "auto",float: "right" }} onClick={() => followUser(arrayF.username)}>Follow</Button>
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