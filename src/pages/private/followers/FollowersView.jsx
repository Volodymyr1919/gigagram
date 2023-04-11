import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useStores } from "../../../stores/MainStore";
// eslint-disable-next-line no-unused-vars
import followersStyle from "./followers.scss";

const Followers = observer((props) => {

  const { username } = props;

  const { RequestsStore, ConfigStore } = useStores();

  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if(username !== undefined ) {
      new Promise((resolve, rejects) => {
        resolve();
      })
      .then(() => {
        return RequestsStore.doGet(ConfigStore.url + "/followers/" + username);
      })
      .then((foll) => {
        setFollowers(foll.followers);
      })
    } else {
      return;
    }
  }, [username]);

  function handleClose() {
    ConfigStore.setIsShowFollowers(false);
  }

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
                  <div>
                    <img src={arrayF.avatar} className="list-item-image" alt="" />
                  </div>
                  <div className="list-item-content">
                    <h4>{arrayF.fullName}</h4>
                    <p>{arrayF.username}</p>
                  </div>
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