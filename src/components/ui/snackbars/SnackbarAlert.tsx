import { FC } from 'react';
import { Alert, AlertColor, Snackbar, SnackbarOrigin } from '@mui/material';

interface Props {
  message: string;
  type: AlertColor;
  open: boolean;
  autoHideDuration: number;
  onClose: () => void;
  position: SnackbarOrigin;
}

const SnackbarAlert: FC<Props> = (props) => {
  const { autoHideDuration, message, open, type, onClose, position } = props;

  return (
    <Snackbar
      anchorOrigin={position}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
