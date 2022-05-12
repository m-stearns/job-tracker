import { Box, Grid, Button, Modal, Typography } from '@mui/material';
import * as React from 'react';

export const DeleteModal: React.FunctionComponent<{
  open: boolean;
  headingText: string;
  message: string;
  deleteById: () => void; // Pass in the delete function specific to the entity we want to delete
  closeModal: () => void;
}> = ({ open, headingText, message, deleteById, closeModal }) => (
  <Modal open={open} onClose={closeModal}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <Typography component="h1" variant="h5">
            {headingText}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{message}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" onClick={closeModal}>
            Back
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="error" onClick={() => deleteById()}>
            Delete
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Modal>
);
