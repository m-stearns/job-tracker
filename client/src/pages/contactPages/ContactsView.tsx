import { Container, Stack, Box, Grid, Button, Paper, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import * as React from 'react';
import { DeleteModal } from '../common/DeleteModal';
import { Contact } from '../types';

export const ContactsView = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const navigate = useNavigate();

  const fakeContact: Contact = {
    id: '1234',
    name: 'Fakey McFakeface',
    email: 'faker@poser.com',
    phone: '555-555-5555-555-555fake555',
    company: 'FakeBlock',
  };

  const deleteContact = React.useCallback(() => {
    // TODO: Call delete contact API
    console.log(`Simulating delete contact ${fakeContact.id}`);
    navigate('/contacts');
  }, [fakeContact.id]);

  return (
    <Container maxWidth="lg">
      <Paper elevation={10} style={{ padding: '16px', margin: '16px auto' }}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Box component="form" noValidate width="400px">
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <Typography>{fakeContact.name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{fakeContact.company}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{fakeContact.email}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{fakeContact.phone}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Link to="/contacts" style={{ textDecoration: 'none' }}>
                  <Button variant="outlined">Back</Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link to={`/contacts/edit/${fakeContact.id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="contained">Edit</Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="error" onClick={handleOpen}>
                  DELETE
                </Button>
                <DeleteModal
                  open={modalOpen}
                  headingText="Are you sure?"
                  message={`Are you sure you want to delete ${fakeContact.name} from your contacts?  This is permenant.`}
                  deleteById={deleteContact}
                  closeModal={handleClose}
                />
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};
