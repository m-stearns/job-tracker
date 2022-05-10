import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Chip, Container, Stack, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import { StatusBar } from './StatusBar';

type JobData = {
  jobId: string;
  title: string;
  company: string;
  description: string;
  status: string;
  link: string;
  internship: boolean;
};

type Skill = {
  id: string;
  name: string;
};

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
};

export const ViewJob = () => {
  const [jobData, setJobData] = useState<JobData | undefined>(undefined);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [contact, setContact] = useState<Contact | undefined>(undefined);
  const { jobId } = useParams() as { jobId: string };

  // TODO: Remove after API call
  const tempSuperFakeNotRealJob = {
    title: 'CTO',
    company: 'FakeBlock',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    status: 'Interview Scheduled',
    link: 'www.google.com',
    internship: false,
  };

  useEffect(() => {
    setJobData({
      ...tempSuperFakeNotRealJob,
      jobId,
    });
    setSkills([
      {
        id: '12345',
        name: 'Python',
      },
      {
        id: '54321',
        name: 'Django',
      },
    ]);
    setContact({
      id: '11111',
      name: 'Maebe Funke',
      email: 'maybe@fakeblock.com',
      phone: '555-555-5555',
      company: 'FakeBlock',
    });
  }, []);

  // Show loading state
  if (!jobData) {
    return (
      <Container maxWidth="lg">
        <p>Loading job...</p>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Paper elevation={10} style={{ padding: '16px', margin: '16px auto' }}>
        <Stack spacing={4}>
          <Typography component="h1" variant="h4">
            {jobData.title} @ {jobData.company}
          </Typography>
          <Stack spacing={1} component="dl">
            <StatusBar currentStatus={jobData.status} />
            <Typography component="dt" sx={{ fontWeight: 'bold' }}>
              Job Title
            </Typography>
            <Typography component="dd">{jobData.title}</Typography>
            <Typography component="dt" sx={{ fontWeight: 'bold' }}>
              Company Name
            </Typography>
            <Typography component="dd">{jobData.company}</Typography>
            <Typography component="dt" sx={{ fontWeight: 'bold' }}>
              Job Description
            </Typography>
            <Typography component="dd">{jobData.description}</Typography>
            <Typography component="dt" sx={{ fontWeight: 'bold' }}>
              URL to job application posting
            </Typography>
            <Typography component="dd">{jobData.link}</Typography>
            <Typography component="dt" sx={{ fontWeight: 'bold' }}>
              Status
            </Typography>
            <Typography component="dd">{jobData.status}</Typography>
          </Stack>
          {skills.length > 0 && (
            <>
              <Typography component="h2" variant="h5">
                Required Skills
              </Typography>
              <SkillsChips skills={skills} />
            </>
          )}
          <Typography component="h2" variant="h5">
            Contact
          </Typography>
          {contact ? (
            <Stack spacing={1} component="dl">
              <Typography component="dt" sx={{ fontWeight: 'bold' }}>
                Name
              </Typography>
              <Typography component="dd">{contact.name}</Typography>
              <Typography component="dt" sx={{ fontWeight: 'bold' }}>
                Email
              </Typography>
              <Typography component="dd">{contact.email}</Typography>
              <Typography component="dt" sx={{ fontWeight: 'bold' }}>
                Phone Number
              </Typography>
              <Typography component="dd">{contact.phone}</Typography>
              <Typography component="dt" sx={{ fontWeight: 'bold' }}>
                Company
              </Typography>
              <Typography component="dd">{contact.company}</Typography>
            </Stack>
          ) : (
            <p>There is no contact information for this job</p>
          )}
        </Stack>
      </Paper>
    </Container>
  );
};

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const SkillsChips: React.FunctionComponent<{ skills: Skill[] }> = ({ skills }) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        gap: '16px',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {skills.map((skill) => {
        return (
          <ListItem key={`skill-${skill.id}`}>
            <Chip
              label={skill.name}
              onClick={() => {
                console.log('TODO: Skill clicked');
              }}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
};
