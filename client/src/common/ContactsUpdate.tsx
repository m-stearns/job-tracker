import React, { useState } from 'react';
import { Typography, Container, Stack, Box, Grid, TextField, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { createContact } from '../repository';
import { useNavigate } from 'react-router-dom';

interface ContactsProps {
  title: string;
  route: string;
}

export const ContactsUpdate = (props: ContactsProps) => {
  const [ContactName, setContactName] = useState<string>('');
  const [ContactEmail, setContactEmail] = useState<string>('');
  const [ContactPhoneNumber, setContactPhoneNumber] = useState<string>('');
  const [ContactCompany, setContactCompany] = useState<string>('');

  const navigate = useNavigate();

  const handleContactNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactName(event.target.value);
  };

  const handleContactEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactEmail(event.target.value);
  };

  const handleContactPhoneNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactPhoneNumber(event.target.value);
  };

  const handleContactCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactCompany(event.target.value);
  };

  const handleCreateContact = async () => {
    const contactRecord = {
      contactName: ContactName,
      email: ContactEmail,
      phoneNumber: ContactPhoneNumber,
      company: ContactCompany,
    };
    await createContact(contactRecord)
      .then(() => {
        console.log('Contact created');
        console.log(contactRecord);
        navigate('/contacts');
      })
      .catch((err: Error) => {
        console.log('error creating contact: ', err);
      });
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={10} style={{ padding: '16px', margin: '16px auto' }}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Typography>{props.title}</Typography>
          <Box component="form" noValidate width="400px">
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  id="contactname"
                  label="Contact Name"
                  variant="standard"
                  fullWidth
                  type="text"
                  onChange={handleContactNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="contactemail"
                  label="Email Address"
                  variant="standard"
                  fullWidth
                  type="text"
                  onChange={handleContactEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="contactphonenumber"
                  label="Phone Number"
                  variant="standard"
                  fullWidth
                  type="text"
                  onChange={handleContactPhoneNoChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="contactcompany"
                  label="Company"
                  variant="standard"
                  fullWidth
                  type="text"
                  onChange={handleContactCompanyChange}
                />
              </Grid>

              <Grid item xs={4}>
                <Link to={props.route} style={{ textDecoration: 'none' }}>
                  <Button variant="outlined">Back</Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" onClick={handleCreateContact}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};
