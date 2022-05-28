import { useState, useEffect } from 'react';
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

import { SkillsUpdate } from '../../common/SkillsUpdate';
import type { Skill, JobNewData } from '../../types';
import { useJobsApi } from '../../common/JobsQueryProvider';
import { fetchSkillsByUser } from '../../repository';
import { useNavigate } from 'react-router-dom';

export const CreateJob = () => {
  const [skillsBank, setSkillsBank] = useState<Skill[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const handleFetchSkills = async () => {
    await fetchSkillsByUser()
      .then((res) => {
        return res.data;
      })
      .then((skillsData) => {
        const skills: Skill[] = [];
        for (let i = 0; i < skillsData.length; i++) {
          const newSkill: Skill = {
            id: skillsData[i].id,
            name: skillsData[i].name,
          };
          skills.push(newSkill);
        }
        return skills;
      })
      .then((skills) => {
        setSkillsBank(skills);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  };

  useEffect(() => {
    handleFetchSkills();
  }, []);

  return (
    <Container maxWidth="lg">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {!isPending && skillsBank && <CreateJobForm skillsData={skillsBank} />}
    </Container>
  );
};

const CreateJobForm: React.FC<{ skillsData: Skill[] }> = ({ skillsData }): React.ReactElement => {
  const navigate = useNavigate();
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
  const [isUrlError, setUrlError] = useState<boolean>(false);

  const [skillsBank] = useState<Skill[]>(skillsData);
  const [userChosenExistingSkills, setUserChosenExistingSkills] = useState<Skill[]>([]);
  const [userChosenNewSkills, setUserChosenNewSkills] = useState<string[]>([]);

  const { addJob } = useJobsApi();

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

  const handleCreateJob = () => {
    // Check required fields are filled out
    if ([jobTitle, companyName, jobURL].every((field) => field.length > 0)) {
      if ([contactName, contactEmail, contactPhoneNumber, contactCompany].every((field) => field.length > 0)) {
        const jobRecord = {
          title: jobTitle,
          company: companyName,
          description: jobDesc ? jobDesc : '',
          link: jobURL,
          status: jobStatus,
          internship: isInternship,
          newSkills: userChosenNewSkills,
          existingSkills: userChosenExistingSkills,
          contact: {
            name: contactName,
            email: contactEmail,
            phone: contactPhoneNumber,
            company: contactCompany,
          },
        } as unknown as JobNewData;
        addJob(jobRecord);
      } else {
        const jobRecord = {
          title: jobTitle,
          company: companyName,
          description: jobDesc ? jobDesc : '',
          link: jobURL,
          status: jobStatus,
          internship: isInternship,
          newSkills: userChosenNewSkills,
          existingSkills: userChosenExistingSkills,
        } as unknown as JobNewData;
        addJob(jobRecord);
      }
    } else {
      if (jobTitle.length === 0) setTitleError(true);
      if (companyName.length === 0) setCompanyError(true);
      if (jobURL.length === 0) setUrlError(true);
    }
  };

  return (
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
            {/** end of jobTitle item */}
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
            <SkillsUpdate
              skillsBankData={skillsBank}
              userChosenExistingSkills={userChosenExistingSkills}
              setUserChosenExistingSkills={setUserChosenExistingSkills}
              userCreatedSkills={userChosenNewSkills}
              setUserCreatedSkills={setUserChosenNewSkills}
            />
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
            {/** end of contact company item */}

            {/** start form buttons */}
            <Grid item xs={6}>
              <Button variant="outlined" onClick={() => navigate('/')}>
                Cancel
              </Button>
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
  );
};
