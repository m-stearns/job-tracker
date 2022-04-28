import { useState } from 'react';
import {
  Typography,
  Container,
  Stack,
  Box,
  Grid,
  TextField,
  Select,
  SelectChangeEvent,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Paper,
} from '@mui/material';

export const CreateJob = () => {
  const [jobTitle, setJobTitle] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [jobDesc, setJobDesc] = useState<string>('');
  const [jobURL, setJobURL] = useState<string>('');
  const [jobStatus, setJobStatus] = useState<string>('Applied');
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactPhoneNumber, setContactPhoneNumber] = useState<string>('');
  const [contactCompany, setContactCompany] = useState<string>('');

  const handleJobTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(event.target.value);
  };

  const handleCompanyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(event.target.value);
  };

  const handleJobDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobDesc(event.target.value);
  };

  const handleJobURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobURL(event.target.value);
  };

  const handleJobStatusChange = (event: SelectChangeEvent) => {
    setJobStatus(event.target.value);
  };

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

  const handleCreateJob = () => {
    const jobRecord = {
      jobTitle,
      companyName,
      jobDesc,
      jobURL,
      jobStatus,
      contactName,
      contactEmail,
      contactPhoneNumber,
      contactCompany,
    };
    // TODO - implement fetch here with HTTP POST, Content-Type application/json
    console.log(jobRecord);
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={10} style={{ padding: '16px', margin: '16px auto' }}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Typography component="h1">Create Job Application</Typography>
          <Box component="form" noValidate width="400px">
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  id="jobtitle"
                  label="Job Title"
                  variant="standard"
                  fullWidth
                  required
                  autoFocus
                  type="text"
                  onChange={handleJobTitleChange}
                />
              </Grid>
              {/** end of jobtitle item */}
              <Grid item xs={12}>
                <TextField
                  id="companyname"
                  label="Company Name"
                  variant="standard"
                  fullWidth
                  required
                  type="text"
                  onChange={handleCompanyNameChange}
                />
              </Grid>
              {/** end of companyname item */}
              <Grid item xs={12}>
                <TextField
                  id="jobdesc"
                  label="Job Description"
                  variant="standard"
                  fullWidth
                  required
                  multiline
                  type="text"
                  onChange={handleJobDescChange}
                />
              </Grid>
              {/** end of jobdesc item */}
              <Grid item xs={12}>
                <TextField
                  id="joburl"
                  label="URL to Job Post"
                  variant="standard"
                  fullWidth
                  required
                  type="text"
                  onChange={handleJobURLChange}
                />
              </Grid>
              {/** end of joburl item */}
              <Grid item xs={12} style={{ marginBottom: '24px' }}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status"
                    label="Status"
                    required
                    fullWidth
                    variant="standard"
                    value={jobStatus}
                    onChange={handleJobStatusChange}
                  >
                    <MenuItem value={'Applied'}>Applied</MenuItem>
                    <MenuItem value={'Interview Scheduled'}>Interview Scheduled</MenuItem>
                    <MenuItem value={'Decision Pending'}>Decision Pending</MenuItem>
                    <MenuItem value={'Accepted'}>Accepted</MenuItem>
                    <MenuItem value={'Rejected'}>Rejected</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/** end of status item */}
              <Typography component="h1">Add Skills</Typography>
              {/** TODO - Need to grab values from Skills here */}
              <Grid item xs={12} style={{ marginBottom: '24px' }}>
                <Button color="primary" sx={{ borderRadius: 28 }} variant="contained">
                  <Typography variant="body2">+Add Skill</Typography>
                </Button>
              </Grid>
              {/** end of add skills item */}
              <Typography component="h1">Add Contact (optional)</Typography>
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
              {/** end of contact name item */}
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
              {/** end of contact email item */}
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
              {/** end of contact phone number item */}
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
              {/** end of contact phone number item */}

              {/** start form buttons */}
              <Grid item xs={6}>
                <Button variant="outlined">Cancel</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" onClick={handleCreateJob}>
                  Submit
                </Button>
              </Grid>
              {/** end form buttons */}
            </Grid>
            {/** end of container */}
          </Box>
          {/** end of form */}
        </Stack>
      </Paper>
    </Container>
  );
};
