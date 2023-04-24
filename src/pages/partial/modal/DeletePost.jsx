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

const AlertDialogModal = observer(() => {

  const { id } = useParams();

  const { RequestsStore, ConfigStore } = useStores();

  const [modalInfo, setModalInfo] = React.useState("Are you sure you want to discard this post?");
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

    const handleDeletePost = () => {
      new Promise((resolve, rejects) => {
        resolve();
      })
      .then(() => {
        return RequestsStore.doDelete(ConfigStore.url + "/post/" + id);
      })
      .then((resp) => {
        resp.deleted ? (
          setOpen(false),
          navigate(-1)
        ) : (
          setModalInfo("Sorry, can not delete this post")
        )
      })
    };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="danger"
         enddecorator={<DeleteForever />}
        onClick={() => setOpen(true)}
      >
        Discard
      </Button>
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
            startdecorator={<WarningRoundedIcon />}
          >
            Confirmation
          </Typography>
          <Divider />
          <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
            {modalInfo}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="solid" color="danger" onClick={handleDeletePost}>
              Continue
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
});

export default AlertDialogModal;