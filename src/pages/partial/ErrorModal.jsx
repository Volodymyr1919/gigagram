import React from "react";
import { observer } from "mobx-react";
import { Modal, Button } from "react-bootstrap";
import { useStores } from "../../stores/MainStore";

const ErrorModal = observer(() => {

    const { ConfigStore } = useStores();

    function handleClose() {
        ConfigStore.setIsShow(false);
    }

    return(
        <Modal show={ConfigStore.isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {ConfigStore.err}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" type="submit" onClick={handleClose}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
});
export default ErrorModal;