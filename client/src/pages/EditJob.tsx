import {
  Container,
  Paper,
  Stack,
  Typography,
  Box,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
} from '@mui/material';
import { useState } from 'react';

export const EditJob = () => {
  const jobData = {
    id: 1,
    internship: false,
    title: 'Data Engineer 3',
    company: 'BigData Spot',
    description: 'yadda yadda',
    link: 'https://www.bigdata.spot.com',
    status: 'Applied',
  } as JobRowData;

  const [jobTitle, setJobTitle] = useState<string>(jobData['title']);
  const [isTitleError, setTitleError] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>(jobData['company']);
  const [isCompanyError, setCompanyError] = useState<boolean>(false);
  const [jobDesc, setJobDesc] = useState<string>(jobData['description']);
  const [isDescriptionError, setDescriptionError] = useState<boolean>(false);
  const [jobURL, setJobURL] = useState<string>(jobData['link']);
  const [isUrlError, setUrlError] = useState<boolean>(false);
  const [isInternship, setIsInternship] = useState<boolean>(jobData['internship']);
  const [jobStatus, setJobStatus] = useState<string>(jobData['status']);

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

  return (
    <Container maxWidth="lg">
      <Paper elevation={10} style={{ padding: '16px', margin: '16px auto' }}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Typography component="h1">Edit Job Application</Typography>
          <Box component="form" noValidate width="400px">
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  id="jobtitle"
                  label="Job Title"
                  variant="standard"
                  fullWidth
                  required
                  type="text"
                  error={isTitleError}
                  value={jobTitle}
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
                  value={companyName}
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
                  type="text"
                  error={isDescriptionError}
                  value={jobDesc}
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
                  value={jobURL}
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
              <Typography component="h1">Edit Skills</Typography>
              {/** TODO - Need to grab values from Skills here */}
              <Grid item xs={12} style={{ marginBottom: '24px' }}>
                <Button color="primary" sx={{ borderRadius: 28 }} variant="contained">
                  <Typography variant="body2">+Add Skill</Typography>
                </Button>
              </Grid>
              {/** end of edit skills item */}
            </Grid>
            {/** end of container */}
          </Box>
          {/** end of form */}
        </Stack>
      </Paper>
    </Container>
  );
};

type JobRowData = {
  id: number;
  internship: boolean;
  title: string;
  company: string;
  description: string;
  link: string;
  status: string;
};
