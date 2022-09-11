import { FC } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface Props {
  title?: string;
}

const Loading: FC<Props> = ({ title = '' }) => {
  return (
    <Box>
      <CircularProgress />
      <Typography>{title}</Typography>
    </Box>
  );
};

export default Loading;
