import { Container, Stack, Box, Grid, Button, Paper, Modal, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Contact } from '../../types';
import { getContact, deleteContact } from '../../repository';

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
          setContactData(data as Contact);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteContact = async () => {
    try {
      await deleteContact(params.id as string);
    } catch (error) {
      console.log(error);
    }
  };

  const routeChange = async () => {
    await handleDeleteContact().then(() => {
      const path = '/contacts';
      navigate(path);
    });
  };

  useEffect(() => {
    handleGetContact();
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
                <Button variant="contained" color="warning" onClick={handleOpen}>
                  DELETE
                </Button>
                <Modal open={open} onClose={handleClose}>
                  <Box sx={style}>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                      <Grid item xs={12}>
                        <Typography>{contactData.name}</Typography>
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
