import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useStores } from '../../../stores/MainStore';
import { observer } from 'mobx-react';
import InfoIcon from '@mui/icons-material/Info';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ChildModal = observer(() => {

    const { ConfigStore } = useStores();

    const handleOpen = () => {
        ConfigStore.setIsChildModalShow(true);
    };
    const handleClose = () => {
        ConfigStore.setIsChildModalShow(false);
    };

    return (
        <React.Fragment>
            <Button onClick={handleOpen}><InfoIcon /></Button>
            <Modal
                open={ConfigStore.isChildModalShow}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                className='ChildModal'
            >
                <Box sx={{ ...style, width: 200, borderRadius: "10px", border: "3px solid #0059f9" }}>
                    <h2 id="child-modal-title">Image and Video fields</h2>
                    <p id="child-modal-description">
                        The image and video fields are required URL, from services where they been hosted
                    </p>
                    <Button onClick={handleClose}>Got it</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
});

export default ChildModal;