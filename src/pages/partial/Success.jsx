import * as React from 'react';
import Stack      from '@mui/material/Stack';
import Button     from '@mui/material/Button';
import Snackbar   from '@mui/material/Snackbar';
import MuiAlert   from '@mui/material/Alert';
import { observer } from 'mobx-react';
import { useStores } from '../../stores/MainStore';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Success = observer(() => {

  const { ConfigStore } = useStores();

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    ConfigStore.setIsShowSnack(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={ConfigStore.isShowSnack}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={ConfigStore.snackSeverity} sx={{ width: '100%' }}>
          {ConfigStore.snackText}
        </Alert>
      </Snackbar>
    </Stack>
  );
});

export default Success;