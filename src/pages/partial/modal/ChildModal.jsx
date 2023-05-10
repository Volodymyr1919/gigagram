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
                <Box sx={{ ...style, width: 100}}>
                    <h2 id="child-modal-title">Image and Video fields</h2>
                    <p id="child-modal-description">
                        The image and video fields are required URL, from services where they been hosted.
                    </p>
                    <p><b>To upload your media to our social network, follow these simple steps:</b></p>
                    <a href="https://imgbb.com/">Click me to get the link of the image</a> <br/> 
                    <a href="https://imagekit.io/">Click me to get the link of the video</a> <br/> <br/>
                    <p>1. Choose the link for either your image or video upload.</p>
                    <p>
                        2. For an image upload, click on the link and repeat the actions in the video or follow the instructions. Click on the 'Start Uploading' button and upload the desired image. Once you get the link, copy it and paste it into your web browser. You will be redirected to a page with the photo. Right-click on the image and select 'Copy Image Address'. You're done!
                    </p>
                    <p>
                        3. For a video upload, click on the link and repeat the actions in the video or follow the instructions. After logging in to the website, you will be redirected to the main page. Then click on the 'Media library' in the sidebar and start uploading your video by clicking the 'New' button in the upper-right corner. You will be redirected to a page with the video. Right-click on the video and select 'Copy Video Address'. Good job!
                    </p>
                    <p>4. You can now use the link you copied to upload your media to our social network.</p>
                    <Button onClick={handleClose}>Got it</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
});

export default ChildModal;