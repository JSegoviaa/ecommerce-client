import { FC } from 'react';
import { Alert } from '@mui/material';

interface Props {
  title: string;
}

const Empty: FC<Props> = ({ title }) => {
  return <Alert severity="warning">{title}</Alert>;
};

export default Empty;
