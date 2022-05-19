import { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Typography, Chip, Container, Stack, Paper, Grid } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { StatusBar } from './StatusBar';
import type { JobPageData, Skill, Contact } from '../../types';
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

  const createSkills = (skillsData: any[]) => {
    const skills: Skill[] = [];
    if (skillsData) {
      for (let i = 0; i < skillsData.length; i++) {
        const skill: Skill = {
          id: skillsData[i].skill['id'],
          name: skillsData[i].skill['name'],
        };
        skills.push(skill);
      }
    }
    return skills;
  };

  const createContact = (
    contactsData: {
      id: string;
      name: string;
      email: string;
      phoneNo: string;
      company: string;
    }[],
  ) => {
    const contact: Contact = {
      id: '-1',
      name: 'n/a',
      email: 'n/a',
      phone: 'n/a',
      company: 'n/a',
    };
    if (contactsData.length > 0) {
      contact.name = contactsData[0]['name'];
      contact.email = contactsData[0]['email'];
      contact.phone = contactsData[0]['phoneNo'];
      contact.company = contactsData[0]['company'];
    }
    return contact;
  };

  const createJobPageData = (data: any, skills: Skill[], contact: Contact) => {
    const jobPageData: JobPageData = {
      id: jobId,
      title: data.title,
      company: data.company,
      description: data.description,
      status: data.status,
      link: data.link,
      internship: data.internship,
      skills: skills,
      contact: contact,
    };
    return jobPageData;
  };

  const handleGetJob = async (jobId: string) => {
    await fetchJob(jobId)
      .then((res) => {
        return res.data[0];
      })
      .then((data) => {
        const skills = createSkills(data.skills);
        const contact = createContact(data.contacts);
        const jobPageData = createJobPageData(data, skills, contact);
        setJobPageData(jobPageData);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  useEffect(() => {
    handleGetJob(jobId);
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
