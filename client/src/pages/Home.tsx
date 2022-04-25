// import { useState } from 'react';
import {
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

export const Home = () => {
  return <NoContent />;
};

const NoContent = () => (
  <Container maxWidth="sm">
    <Paper elevation={10} style={{ padding: '32px', margin: '16px auto' }}>
      <Stack spacing={6} justifyContent="center" alignItems="center">
        <Typography sx={{ fontStyle: 'italic', pt: '8px' }}>Nothing to see here...</Typography>
        <Button variant="contained" onClick={() => alert('TODO: go to create job page')}>
          {/* <Link to="/create-job" style={{ textDecoration: 'none' }}> */}
          Create new application
          {/* </Link> */}
        </Button>
      </Stack>
    </Paper>
  </Container>
);
