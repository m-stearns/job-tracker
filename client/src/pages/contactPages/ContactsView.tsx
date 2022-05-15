import { Container, Stack, Box, Grid, Button, Paper, Modal, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Contact } from '../../types';
import { getContact } from '../../repository';
//import { AxiosResponse } from 'axios';

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

const blankContact: Contact = {
  name: 'blank',
  phoneNo: 'blank',
  email: 'blank',
  company: 'blank',
  id: 'blank',
};

export const ContactsView = () => {
  const params = useParams();
  const [contactData, setContactData] = useState<Contact>(blankContact);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const fakeContact: Contact = {
    id: '1234',
    name: 'Fakey McFakeface',
    email: 'faker@poser.com',
    phone: '555-555-5555-555-555fake555',
    company: 'FakeBlock',
  };

  const handleGetContact = async () => {
    try {
      await getContact(params.id as string)
        .then((res) => {
          if (res != undefined) {
            return res.data;
          }
        })
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetContact();
    //console.log(contactData);
  }, []);

  return (
    <Container maxWidth="lg">
      <Paper elevation={10} style={{ padding: '16px', margin: '16px auto' }}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Box component="form" noValidate width="400px">
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <Typography>{contactData.name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{contactData.email}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{contactData.phoneNo}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{contactData.company}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Link to="/contacts" style={{ textDecoration: 'none' }}>
                  <Button variant="outlined">Back</Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link to={`/contacts/edit/${contactData.id}`} style={{ textDecoration: 'none' }}>
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
