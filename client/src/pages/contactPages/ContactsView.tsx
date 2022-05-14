import { Container, Stack, Box, Grid, Button, Paper, Modal, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
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
    <Container maxWidth="lg">
      <Paper elevation={10} style={{ padding: '16px', margin: '16px auto' }}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Box component="form" noValidate width="400px">
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <Typography>Contact Name</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Email Address</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Phone Number</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Company</Typography>
              </Grid>
              <Grid item xs={4}>
                <Link to="/contacts" style={{ textDecoration: 'none' }}>
                  <Button variant="outlined">Back</Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link to="/contacts/edit/${row.id}" style={{ textDecoration: 'none' }}>
                  <Button variant="contained">Edit</Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="warning" onClick={handleOpen}>
                  DELETE
                </Button>
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
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};
