import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ErrorModal(props) {

    const { isShow, onClose: setShow } = props;

    function handleClose() {
        setShow(false);
    }

    return(
        <Modal show={isShow}>
            <Modal.Header closeButton onClick={handleClose}>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.err}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" type="submit" onClick={handleClose}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
}