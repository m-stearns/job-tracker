import React, { useState } from 'react';
import { Typography, Container, Stack, Box, Grid, TextField, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

export const CreateContact = () => {
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactPhoneNumber, setContactPhoneNumber] = useState<string>('');
  const [contactCompany, setContactCompany] = useState<string>('');

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

  const handleCreateContact = () => {
    const contactRecord = {
      contactName,
      contactEmail,
      contactPhoneNumber,
      contactCompany,
    };
    console.log(contactRecord);
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={10} style={{ padding: '16px', margin: '16px auto' }}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Typography component="h1">Create New Contact</Typography>
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

              <Grid item xs={6}>
                <Button variant="outlined">
                  <Link to="/contacts" style={{ textDecoration: 'none' }}>
                    Cancel
                  </Link>
                </Button>
              </Grid>
              <Grid item xs={6}>
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
