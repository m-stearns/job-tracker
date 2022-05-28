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
import { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { JobPageData, JobNewData, Skill } from '../../types';
import { fetchJob, fetchSkillsByUser } from '../../repository';

import { createJobPageData, createContact, createSkills } from '../../common/JobPageData';
import { SkillsUpdate } from '../../common/SkillsUpdate';
import { useJobsApi } from '../../common/JobsQueryProvider';

export const EditJob = () => {
  const { jobId } = useParams() as { jobId: string };

  const initialData: JobPageData = {
    id: '-1',
    title: '',
    company: '',
    description: '',
    status: '',
    link: '',
    internship: false,
    skills: [],
    contact: {
      id: '-1',
      name: '',
      email: '',
      phoneNo: '',
      company: '',
    },
  };
  const [jobPageData, setJobPageData] = useState<JobPageData>(initialData);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const [skillsBankForUser, setSkillsBankForUser] = useState<Skill[]>([]);
  const [skillsBankPending, setSkillsBankPending] = useState<boolean>(true);
  const [skillsBankError, setSkillsBankError] = useState(null);

  const handleFetchJobById = async (jobId: string) => {
    await fetchJob(jobId)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        const skills = createSkills(data.skills);
        const contact = createContact(data.contacts);
        const jobPageData = createJobPageData(data, skills, contact);
        setJobPageData(jobPageData);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        console.log(`err = ${err}`);
        setIsPending(false);
        setError(err.message);
      });
  };

  const handleFetchSkillsByUser = async () => {
    await fetchSkillsByUser()
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        console.log(data);
        setSkillsBankForUser(data);
        setSkillsBankPending(false);
        setSkillsBankError(null);
      })
      .catch((err) => {
        console.log(`error = ${err}`);
        setSkillsBankPending(false);
        setSkillsBankError(err.message);
      });
  };

  useEffect(() => {
    handleFetchJobById(jobId);
    handleFetchSkillsByUser();
  }, []);

  return (
    <Container maxWidth="lg">
      {(error || skillsBankError) && <ErrorScreen />}
      {(isPending || skillsBankPending) && <Loading />}
      {!isPending && !skillsBankPending && jobPageData && skillsBankForUser && (
        <EditScreen data={jobPageData} skillsBankForUser={skillsBankForUser} />
      )}
    </Container>
  );
};

const Loading = () => (
  <Paper elevation={10} style={{ padding: '32px', margin: '16px auto' }}>
    <Stack spacing={6} justifyContent="center" alignItems="center">
      <Typography sx={{ fontStyle: 'italic', pt: '8px' }}>Loading...</Typography>
    </Stack>
  </Paper>
);

const ErrorScreen = () => (
  <Paper elevation={10} style={{ padding: '32px', margin: '16px auto' }}>
    <Stack spacing={6} justifyContent="center" alignItems="center">
      <Typography sx={{ fontStyle: 'italic', pt: '8px' }}>Error occurred!</Typography>
    </Stack>
  </Paper>
);

const EditScreen: React.FC<{ data: JobPageData; skillsBankForUser: Skill[] }> = ({ data, skillsBankForUser }) => {
  const navigate = useNavigate();
  // Job record dependencies
  const [jobTitle, setJobTitle] = useState<string>(data.title);
  const [companyName, setCompanyName] = useState<string>(data.company);
  const [jobDesc, setJobDesc] = useState<string>(data.description);
  const [jobURL, setJobURL] = useState<string>(data.link);
  const [isInternship, setInternship] = useState<boolean>(data.internship);
  const [jobStatus, setJobStatus] = useState<string>(data.status);

  // SkillsUpdate.tsx dependencies
  const [skillsBank] = useState<Skill[]>(skillsBankForUser);
  const [userChosenExistingSkills, setUserChosenExistingSkills] = useState<Skill[]>(data.skills);
  const [userCreatedSkills, setUserCreatedSkills] = useState<string[]>([]);

  // Contact dependencies
  const [contactId] = useState<string>(data.contact.id);
  const [contactName, setContactName] = useState<string>(data.contact.name);
  const [contactEmail, setContactEmail] = useState<string>(data.contact.email);
  const [contactPhone, setContactPhone] = useState<string>(data.contact.phoneNo);
  const [contactCompany, setContactCompany] = useState<string>(data.contact.company);

  const [isTitleError, setTitleError] = useState<boolean>(false);
  const [isCompanyError, setCompanyError] = useState<boolean>(false);
  const [isUrlError, setUrlError] = useState<boolean>(false);

  const { editJob } = useJobsApi();

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
    setContactPhone(event.target.value);
  };

  const handleContactCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactCompany(event.target.value);
  };

  const handleEditJobPageData = () => {
    if ([jobTitle, companyName, jobURL].every((field) => field.length > 0)) {
      const editedJobData: JobNewData = {
        id: data.id,
        title: jobTitle,
        company: companyName,
        description: jobDesc ? jobDesc : '',
        status: jobStatus,
        link: jobURL,
        internship: isInternship,
        newSkills: userCreatedSkills,
        existingSkills: userChosenExistingSkills,
        contact: {
          id: contactId,
          name: contactName,
          email: contactEmail,
          phoneNo: contactPhone,
          company: contactCompany,
        },
      };
      const editJobRecord = {
        jobId: data.id,
        newJobData: editedJobData,
      };
      editJob(editJobRecord);
    } else {
      if (jobTitle.length === 0) setTitleError(true);
      if (companyName.length === 0) setCompanyError(true);
      // if (jobDesc.length === 0) setDescriptionError(true);
      if (jobURL.length === 0) setUrlError(true);
    }
  };

  return (
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
                type="text"
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
                control={<Checkbox checked={isInternship} onChange={() => setInternship(!isInternship)} />}
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
            <SkillsUpdate
              skillsBankData={skillsBank}
              userChosenExistingSkills={userChosenExistingSkills}
              setUserChosenExistingSkills={setUserChosenExistingSkills}
              userCreatedSkills={userCreatedSkills}
              setUserCreatedSkills={setUserCreatedSkills}
            />
            {/** end of edit skills item */}
            <Typography component="h1">Edit Contact</Typography>
            <Grid item xs={12}>
              <TextField
                id="contactname"
                label="Contact Name"
                variant="standard"
                fullWidth
                type="text"
                value={contactName}
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
                value={contactEmail}
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
                value={contactPhone}
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
                value={contactCompany}
                onChange={handleContactCompanyChange}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                style={{ textDecoration: 'none' }}
                onClick={() => navigate(`/jobs/view/${data.id}`)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" onClick={handleEditJobPageData}>
                Submit
              </Button>
            </Grid>
          </Grid>
          {/** end of container */}
        </Box>
        {/** end of form */}
      </Stack>
    </Paper>
  );
};
