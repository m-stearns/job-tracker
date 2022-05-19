import { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Typography, Chip, Container, Stack, Paper, Grid } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { StatusBar } from './StatusBar';
import type { JobPageData, Skill } from '../../types';
import { DeleteModal } from '../../common/DeleteModal';
import { fetchJob } from '../../repository';

export const ViewJob = () => {
  const [jobPageData, setJobPageData] = useState<JobPageData | undefined>(undefined);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { jobId } = useParams() as { jobId: string };
  const navigate = useNavigate();

  const toggleModal = useCallback(() => {
    setModalIsOpen(!modalIsOpen);
  }, [modalIsOpen]);

  const handleGetJob = async (jobId: string) => {
    await fetchJob(jobId)
      .then((res) => {
        return res.data[0];
      })
      .then((data) => {
        const jobPageData: JobPageData = {
          id: jobId,
          title: data.title,
          company: data.company,
          description: data.description,
          status: data.status,
          link: data.link,
          internship: data.internship,
          skills: [
            {
              id: '1234',
              name: 'python',
            },
          ],
          contact: {
            id: '11111',
            name: 'Maebe Funke',
            email: 'maybe@fakeblock.com',
            phone: '555-555-5555',
            company: 'FakeBlock',
          },
        };
        setJobPageData(jobPageData);
        return data;
      });
  };

  useEffect(() => {
    handleGetJob(jobId);
  }, []);

  // TODO: Remove after API call
  const tempSuperFakeNotRealJob = {
    id: jobId,
    title: 'CTO',
    company: 'FakeBlock',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    status: 'Interview Scheduled',
    link: 'www.google.com',
    internship: false,
  };

  useEffect(() => {
    setJobPageData({
      ...tempSuperFakeNotRealJob,
      skills: [
        {
          id: '12345',
          name: 'Python',
        },
        {
          id: '54321',
          name: 'Django',
        },
      ],
      contact: {
        id: '11111',
        name: 'Maebe Funke',
        email: 'maybe@fakeblock.com',
        phone: '555-555-5555',
        company: 'FakeBlock',
      },
    });
  }, []);

  const deleteJob = useCallback(() => {
    // TODO: Call delete job API
    console.log(`Simulating delete job ${jobId}`);
    navigate('/');
  }, [jobId]);

  // Show loading state
  if (!jobPageData) {
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
            {jobPageData.title} @ {jobPageData.company}
          </Typography>
          <Stack spacing={1} component="dl">
            <StatusBar currentStatus={jobPageData.status} />
            <Typography component="dt" sx={{ fontWeight: 'bold' }}>
              Job Title
            </Typography>
            <Typography component="dd">{jobPageData.title}</Typography>
            <Typography component="dt" sx={{ fontWeight: 'bold' }}>
              Company Name
            </Typography>
            <Typography component="dd">{jobPageData.company}</Typography>
            <Typography component="dt" sx={{ fontWeight: 'bold' }}>
              Job Description
            </Typography>
            <Typography component="dd">{jobPageData.description}</Typography>
            <Typography component="dt" sx={{ fontWeight: 'bold' }}>
              URL to job application posting
            </Typography>
            <Typography component="dd">{jobPageData.link}</Typography>
            <Typography component="dt" sx={{ fontWeight: 'bold' }}>
              Status
            </Typography>
            <Typography component="dd">{jobPageData.status}</Typography>
          </Stack>
          {jobPageData.skills.length > 0 && (
            <>
              <Typography component="h2" variant="h5">
                Required Skills
              </Typography>
              <SkillsChips skills={jobPageData.skills} />
            </>
          )}
          <Typography component="h2" variant="h5">
            Contact
          </Typography>
          {jobPageData.contact ? (
            <Stack spacing={1} component="dl">
              <Typography component="dt" sx={{ fontWeight: 'bold' }}>
                Name
              </Typography>
              <Typography component="dd">{jobPageData.contact.name}</Typography>
              <Typography component="dt" sx={{ fontWeight: 'bold' }}>
                Email
              </Typography>
              <Typography component="dd">{jobPageData.contact.email}</Typography>
              <Typography component="dt" sx={{ fontWeight: 'bold' }}>
                Phone Number
              </Typography>
              <Typography component="dd">{jobPageData.contact.phone}</Typography>
              <Typography component="dt" sx={{ fontWeight: 'bold' }}>
                Company
              </Typography>
              <Typography component="dd">{jobPageData.contact.company}</Typography>
            </Stack>
          ) : (
            <p>There is no contact information for this job</p>
          )}
          <Grid container direction="row" justifyContent="space-evenly">
            <Button variant="contained" onClick={() => console.log('todo')}>
              Edit Job
            </Button>
            <Button variant="contained" color="error" onClick={toggleModal}>
              Delete Job
            </Button>
          </Grid>
          <DeleteModal
            open={modalIsOpen}
            headingText="Are you sure?"
            message={`Are you sure you want to delete ${jobPageData.title} at ${jobPageData.company}?  This is permenant.`}
            deleteById={deleteJob}
            closeModal={toggleModal}
          />
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
