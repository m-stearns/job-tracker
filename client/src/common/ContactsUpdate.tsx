import React, { useState, useEffect } from 'react';
import {
  Typography,
  Container,
  Stack,
  Box,
  Grid,
  TextField,
  Button,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { createContact, editContact, fetchJobs, getContact } from '../repository';
import type { JobRowData } from '../types';

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
  const [jobsData, setJobsData] = useState<JobRowData[]>([]);
  const [jobId, setJobId] = useState<string>('');
  const [selectName, setSelectName] = useState<string>('');

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

  const handleJobIdChange = (job: JobRowData) => {
    setJobId(job.id);
    setSelectName(job.title);
  };

  const handleCreateContact = async () => {
    if (props.title == 'Create Contact') {
      const contactRecord = {
        contactName: ContactName,
        email: ContactEmail,
        phoneNo: ContactPhoneNumber,
        company: ContactCompany,
        jobId,
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
        jobId,
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

  const handleGetJobs = async () => {
    await fetchJobs().then((res) => {
      setJobsData(res.data);
    });
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
    handleGetJobs();
  }, []);

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

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Job</InputLabel>
                  <Select value={selectName}>
                    {jobsData.map((job) => (
                      <MenuItem key={job.id} value={job.title} onClick={() => handleJobIdChange(job)}>
                        {job.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
