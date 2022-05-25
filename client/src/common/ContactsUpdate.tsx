import React, { useState, useEffect } from 'react';
import { Typography, Container, Stack, Box, Grid, TextField, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { createContact, editContact, getContact } from '../repository';

interface ContactsProps {
  title: string;
  route: string;
}

export const ContactsUpdate = (props: ContactsProps) => {
  const params = useParams();
  const [ContactName, setContactName] = useState<string>('');
  const [ContactEmail, setContactEmail] = useState<string>('');
  const [ContactPhoneNumber, setContactPhoneNumber] = useState<string>('');
  const [ContactCompany, setContactCompany] = useState<string>('');

  let route: string;

  if (props.title == 'Create Contact') {
    route = '/contacts';
  } else {
    route = `/contacts/view/${params.id}`;
  }

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
    if (props.title == 'Create Contact') {
      const contactRecord = {
        contactName: ContactName,
        email: ContactEmail,
        phoneNo: ContactPhoneNumber,
        company: ContactCompany,
        jobId: null,
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
    } else {
      const contactRecord = {
        contactName: ContactName,
        email: ContactEmail,
        phoneNo: ContactPhoneNumber,
        company: ContactCompany,
        id: params.id as string,
      };
      await editContact(contactRecord)
        .then(() => {
          console.log('Contact created');
          console.log(contactRecord);
          navigate('/contacts');
        })
        .catch((err: Error) => {
          console.log('error creating contact: ', err);
        });
    }
  };

  const handleGetContact = async () => {
    await getContact(params.id as string).then((res) => {
      if (res != undefined) {
        setContactName(res.data.name);
        setContactEmail(res.data.email);
        setContactPhoneNumber(res.data.phoneNo);
        setContactCompany(res.data.company);
      }
    });
  };

  useEffect(() => {
    if (props.title == 'Edit Contact') {
      handleGetContact();
    }
  }, []);

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
                  value={ContactName}
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
                  value={ContactEmail}
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
                  value={ContactPhoneNumber}
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
                  value={ContactCompany}
                />
              </Grid>

              <Grid item xs={12} container spacing={20} alignItems="center" justifyContent="left">
                <Grid item xs={4}>
                  <Link to={route} style={{ textDecoration: 'none' }}>
                    <Button variant="outlined">Back</Button>
                  </Link>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" onClick={handleCreateContact}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};
