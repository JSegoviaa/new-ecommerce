import { FC } from 'react';
import { Alert, AlertTitle, AlertColor } from '@mui/material';

interface Props {
  msg: string;
  type: AlertColor;
  title: string;
}

const AlertMsg: FC<Props> = ({ msg, type, title }) => {
  return (
    <Alert severity={type}>
      <AlertTitle>{title}</AlertTitle>
      {msg}
    </Alert>
  );
};

export default AlertMsg;
