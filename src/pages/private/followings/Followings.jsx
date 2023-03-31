import React, { useState, useEffect } from "react";
import followerStyle from "../followers/followers.scss";

export default function Followings() {
  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    function getFollowings() {
      fetch("http://65.109.13.139:9191/followings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then(async (response) => {
          const isJson = response.headers
            .get("content-type")
            ?.includes("application/json");
          const data = isJson && (await response.json());
          console.log(data);
          setFollowings(data.following);

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
    getFollowings();
  }, []);
  console.log(followings);

  return (
    <div className="followers">
      <div className="list-wrapper">
        <h2>Followings</h2>
        <ul className="list">
          {followings.map((arrayF) => (
            <li
              key={arrayF._id}
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
}
