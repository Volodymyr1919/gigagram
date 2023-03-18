import React, { useState, useEffect }   from "react";
import { Modal, Button }                from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";

export default function Feed() {

    const [posts, setPosts] = useState([]);
    const [show, setShow] = useState(false);
    const [err, setErr] = useState("");

    useEffect(() => {
        function getPosts() {
            fetch('http://65.109.13.139:9191/posts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token')
                }
            })
            .then((data) => {
                if (data.ok) {
                    return data.json();
                } else {
                    setErr(data.statusText);
                    setShow(true);
                    return;
                }
            })
            .then((data) => {
                console.log(data);
                setPosts(data);
            })
        }
        getPosts();
    },[]);

    function handleClose() {
        setShow(false);
    };

    return(
        <>
            <p>Feed page</p>
            <span>
                {
                    posts === undefined ? <p>Sorry any posts found</p> : posts.map(item => <div key={item._id}>
                        {item.image ? <img src={item.image} alt="post" width={240} height={320} /> : ""}
                        {item.video ? <video autoPlay muted loop><source src={item.video} type="video/mp4" /></video> : ""}
                    </div>)
                }
            </span>
            <Modal show={show}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {err}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>OK</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}