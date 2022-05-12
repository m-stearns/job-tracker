import { Box, Grid, Button, Modal, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export const ContactsView = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const routeChange = () => {
    const path = '/contacts';
    navigate(path);
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Typography>Contact Name</Typography>
          </Grid>

          <Typography>Are you sure you want to delete this Contact?</Typography>
          <Grid item xs={4}>
            <Button variant="outlined" onClick={handleClose}>
              Back
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" color="warning" onClick={routeChange}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
