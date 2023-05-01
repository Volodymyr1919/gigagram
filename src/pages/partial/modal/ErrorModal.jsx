import React                     from "react";
import { observer }              from "mobx-react";
import { Modal, Button }         from "react-bootstrap";
import { useStores }             from "../../../stores/MainStore";
import { useNavigate }           from "react-router-dom";

const ErrorModal = observer(() => {

    const { ConfigStore } = useStores();
    const navigate = useNavigate();

    function handleClose() {
        ConfigStore.setIsShow(false);
        if(window.location.pathname === "/feed" || "/my-page") {
            localStorage.clear();
            navigate("/signin");
        }
    }

    return(
        <Modal className="modals" show={ConfigStore.isShow} onHide={handleClose}>
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