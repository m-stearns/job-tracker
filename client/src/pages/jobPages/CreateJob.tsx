import { useState } from 'react';
import {
  Typography,
  Checkbox,
  Container,
  Stack,
  Box,
  Grid,
  TextField,
  Select,
  SelectChangeEvent,
  MenuItem,
  FormControl,
  FormControlLabel,
  InputLabel,
  Button,
  Paper,
} from '@mui/material';
import { createJob } from '../../repository';
import { useNavigate } from 'react-router-dom';
import { SkillsUpdate, skillDataRecord } from '../../common/SkillsUpdate';

export const CreateJob = () => {
  const [jobTitle, setJobTitle] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [jobDesc, setJobDesc] = useState<string>('');
  const [jobURL, setJobURL] = useState<string>('');
  const [isInternship, setIsInternship] = useState<boolean>(false);
  const [jobStatus, setJobStatus] = useState<string>('Applied');
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactPhoneNumber, setContactPhoneNumber] = useState<string>('');
  const [contactCompany, setContactCompany] = useState<string>('');
  const [isTitleError, setTitleError] = useState<boolean>(false);
  const [isCompanyError, setCompanyError] = useState<boolean>(false);
  const [isDescriptionError, setDescriptionError] = useState<boolean>(false);
  const [isUrlError, setUrlError] = useState<boolean>(false);
  const [skillsData, setSkillsData] = useState<skillDataRecord[]>([]);
  const skills = [{ name: 'python' }, { name: 'react' }];
  const [existingSkillsData] = useState<skillDataRecord[]>(skills);

  const navigate = useNavigate();

  const handleJobTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(event.target.value);
    setTitleError(false);
  };

  const handleCompanyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(event.target.value);
    setCompanyError(false);
  };

  const handleJobDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobDesc(event.target.value);
    setDescriptionError(false);
  };

  const handleJobURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobURL(event.target.value);
    setUrlError(false);
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

  const handleCreateJob = async () => {
    // Check required fields are filled out
    if ([jobTitle, companyName, jobDesc, jobURL].every((field) => field.length > 0)) {
      const jobRecord = {
        jobTitle,
        companyName,
        jobDesc,
        jobURL,
        jobStatus,
        isInternship,
        contactName,
        contactEmail,
        contactPhoneNumber,
        contactCompany,
      };
      // TODO - implement fetch here with HTTP POST, Content-Type application/json
      await createJob(jobRecord)
        .then(() => {
          console.log('Job created successfully');
          navigate('/');
        })
        .catch((err: Error) => {
          console.log('error creating job: ', err);
        });
    } else {
      if (jobTitle.length === 0) setTitleError(true);
      if (companyName.length === 0) setCompanyError(true);
      if (jobDesc.length === 0) setDescriptionError(true);
      if (jobURL.length === 0) setUrlError(true);
    }
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
                  error={isTitleError}
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
                  error={isCompanyError}
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
                  error={isDescriptionError}
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
                  error={isUrlError}
                  onChange={handleJobURLChange}
                />
              </Grid>
              {/** end of joburl item */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={isInternship} onChange={() => setIsInternship(!isInternship)} />}
                  label="This position is an internship"
                />
              </Grid>
              {/** end of internship item */}
              <Grid item xs={12} style={{ marginBottom: '48px' }}>
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
              <SkillsUpdate skillsData={skillsData} existingSkillsData={existingSkillsData} setSkills={setSkillsData} />
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
