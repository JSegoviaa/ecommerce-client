import { FC } from 'react';
import { Alert } from '@mui/material';

interface Props {
  error: string | undefined;
}

const Error: FC<Props> = ({ error }) => {
  return <Alert severity="error">{error}</Alert>;
};

export default Error;
