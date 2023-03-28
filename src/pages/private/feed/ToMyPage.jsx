import React, { useState, useEffect } from "react";

export default function ToMyPage() {

    const[me, setMe] = useState("");

    useEffect(() => {
        function getMe() {
            fetch('http://65.109.13.139:9191/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token')
                }
            })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                console.log(data);
                setMe(data);
                localStorage.setItem("avatar", data.avatar);
            })
        }
        getMe();
    },[])

    return(
        <>
            <figure className="me__avatar">
                <img src={me.avatar} alt="my avatar" />
            </figure>
            <p className="me__username">{me.username}</p>
        </>
    );
}