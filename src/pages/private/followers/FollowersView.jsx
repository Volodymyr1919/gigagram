import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import FollowersStore from "../../../stores/privateStores/FollowersStore";
// eslint-disable-next-line no-unused-vars
import followersStyle from "./followers.scss";

const Followers = observer((props) => {

  const { showFollowers, onClose: setShowFollowers } = props;

  useEffect(() => {
    FollowersStore.getFollowers()
  }, []);

  function handleClose() {
    setShowFollowers(false);
  }

  return (
    <Modal show={showFollowers} className="followers">
      <Modal.Header closeButton onClick={handleClose} className="list-wrapper">
        <Modal.Title>Followers</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Followers</p>
        <ul className="list">
          {/* сделай массив из... */}
          {FollowersStore.followers.map((arrayF) => (
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
          ))}
        </ul>
    </Modal.Body>
    </Modal>
  );
})
export default Followers