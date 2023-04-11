import React, { useState, useEffect } from "react";
import { observer }                   from "mobx-react-lite";
import { Button, Modal }              from "react-bootstrap";
import { useStores }                  from "../../../stores/MainStore";
import followerStyle                  from "../followers/followers.scss";

const Followings = observer((props) => {

  const { username } = props;

  const { RequestsStore, ConfigStore } = useStores();

  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    if(username !== undefined ) {
      new Promise((resolve, rejects) => {
        resolve();
      })
      .then(() => {
        return RequestsStore.doGet(ConfigStore.url + "/followings/" + username);
      })
      .then((foll) => {
        setFollowings(foll.following);
      })
    } else {
      return;
    }
  }, [username]);

  function handleClose() {
    ConfigStore.setIsShowFollowings(false);
  }

  return (
    <Modal show={ConfigStore.isShowFollowings} className="followers" onHide={handleClose}> 
      <Modal.Header closeButton >
        <Modal.Title>Followings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul className="list">
          { followings === undefined ?
                <div className="loader">Loading...</div>
                :
                followings.map((arrayF) => (
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

export default Followings;