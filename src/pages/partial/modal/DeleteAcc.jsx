import * as React                   from 'react';
import { useNavigate, useParams }   from "react-router-dom";
import Box                          from '@mui/joy/Box';
import Button                       from '@mui/joy/Button';
import Divider                      from '@mui/joy/Divider';
import Modal                        from '@mui/joy/Modal';
import ModalDialog                  from '@mui/joy/ModalDialog';
import DeleteForever                from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon           from '@mui/icons-material/WarningRounded';
import Typography                   from '@mui/joy/Typography';
import { observer }                 from 'mobx-react';
import { useStores }                from '../../../stores/MainStore';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import MoodIcon from '@mui/icons-material/Mood';

const DeleteAcc = observer(() => {

  const { RequestsStore, ConfigStore } = useStores();

  const [modalInfo, setModalInfo] = React.useState("Are you sure you want to delete your account?");
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

    const handleDeleteMe = () => {
      new Promise((resolve, rejects) => {
        resolve();
      })
      .then(() => {
        return RequestsStore.doDelete(ConfigStore.url + "/me");
      })
      .then((resp) => {
        resp.deleted ? (
          setOpen(false),
          navigate("/signin")
        ) : (
          setModalInfo("Sorry, can not delete your account")
        )
      })
    };

  return (
    <React.Fragment>
      <span
        style={{color: "red"}}
        enddecorator={<DeleteForever />}
        onClick={() => setOpen(true)}
      >
        Delete account
      </span>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          aria-labelledby="alert-dialog-modal-title"
          aria-describedby="alert-dialog-modal-description"
        >
          <Typography
            id="alert-dialog-modal-title"
            component="h2"
            startDecorator={<WarningRoundedIcon />}
          >
            Confirmation
          </Typography>
          <Divider />
          <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
            {modalInfo}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
              No <span style={{marginLeft: "5px"}}><MoodIcon /></span>
            </Button>
            <Button variant="solid" color="danger" onClick={handleDeleteMe}>
              Yes <span style={{marginLeft: "5px"}}><SentimentDissatisfiedIcon/></span>
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
});

export default DeleteAcc;