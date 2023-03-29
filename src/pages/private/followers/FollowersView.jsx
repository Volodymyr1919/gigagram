import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import FollowersStore from "../../../stores/privateStores/FollowersStore";
// eslint-disable-next-line no-unused-vars
import followersStyle from "./followers.scss";

const Followers = observer(() => {
  useEffect(() => {
    FollowersStore.getFollowers()
  }, []);

  return (
    <div className="followers">
      <div className="list-wrapper">
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
      </div>
    </div>
  );
})
export default Followers