import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import followersStyle from "./followers.scss";

export default function Followers() {

    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        function getFollowers() {
            fetch('http://65.109.13.139:9191/followers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token')
                }
            })
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                console.log(data);
                setFollowers(data.followers);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        }
        getFollowers();
    }, [])

    return (
        <div>
            <div
                className="list-wrapper"
            >
                <p>Followers</p>
                <ul className="list">
                {/* сделай массив из... */}
                {followers.map(arrayF => 
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
                )}
                </ul>
            </div>
        </div>
    );
}