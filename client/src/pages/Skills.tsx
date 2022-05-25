import { useEffect, useState } from 'react';
import { fetchSkillsStats } from '../repository';
import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  Modal,
  Paper,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
} from '@mui/material';
import { SkillStats } from '../types';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { SkillsUpdate } from '../common/SkillsUpdate';
import { Skill } from '../types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const Skills = () => {
  // is fetching
  const [isFetching, setIsFetching] = useState(true);
  const [skillsStats, setSkillsStats] = useState<SkillStats | null>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [userChosenExistingSkills, setUserChosenExistingSkills] = useState<Skill[]>([]);
  const [userChosenNewSkills, setUserChosenNewSkills] = useState<string[]>([]);
  const tempSkillsData = [
    { id: '1', name: 'python' },
    { id: '2', name: 'react' },
  ];
  const [existingSkillsData] = useState<Skill[]>(tempSkillsData);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchSkillsStats();
      setSkillsStats(data);
    };
    fetchData();
    setIsFetching(false);
  }, []);

  const renderComfortLevelStars = (comfortLevel: number) => {
    const stars = Array(comfortLevel + 1).fill(0);
    return (
      <span>
        {stars.map((_, i) => (
          <span key={i}>&#9733;</span>
        ))}
      </span>
    );
  };

  const renderSkillRow = (stats: SkillStats['userSkillsStats'] | SkillStats['otherJobSkillsStats']) => {
    if (!stats || !stats.length) {
      return (
        <TableRow>
          <TableCell>
            <Typography variant="body1">No skills</Typography>
          </TableCell>
        </TableRow>
      );
    }

    return stats.map((stat) => {
      return (
        <TableRow key={stat.id}>
          <TableCell align="right">{stat.name}</TableCell>
          {/* @ts-expect-error todo maybe never */}
          {stat.comfortLevel != undefined ? (
            /* @ts-expect-error todo maybe never */
            <TableCell align="right">{renderComfortLevelStars(stat.comfortLevel)}</TableCell>
          ) : null}
          <TableCell align="right">{stat.count}</TableCell>
          <TableCell align="right">{stat.appearsInPercentageOfJobs}%</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Container maxWidth="lg">
      {isFetching && <Typography>Loading...</Typography>}
      {skillsStats?.userSkillsStats && !isFetching && (
        <Stack spacing={4} sx={{ py: '24px' }}>
          <Button
            onClick={handleOpen}
            variant="contained"
            sx={{ width: 'fit-content' }}
            startIcon={<AddCircleOutlineIcon />}
          >
            ADD NEW SKILL
          </Button>
          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <SkillsUpdate
                skillsBankData={existingSkillsData}
                userChosenExistingSkills={userChosenExistingSkills}
                setUserChosenExistingSkills={setUserChosenExistingSkills}
                userCreatedSkills={userChosenNewSkills}
                setUserCreatedSkills={setUserChosenNewSkills}
              />
            </Box>
          </Modal>
          <Typography component="h1" variant="h3">
            My Skills
          </Typography>
          <TableContainer component={Paper} elevation={4}>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    th: {
                      fontSize: '1.5rem',
                    },
                  }}
                >
                  <TableCell align="right">Skill</TableCell>
                  <TableCell align="right">Comfort Level</TableCell>
                  <TableCell align="right">Appears in # of Jobs</TableCell>
                  <TableCell align="right">Appears in % of Jobs</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderSkillRow(skillsStats.userSkillsStats)}</TableBody>
            </Table>
          </TableContainer>
        </Stack>
      )}

      {skillsStats?.otherJobSkillsStats && !isFetching && (
        <Stack spacing={4} sx={{ py: '24px' }}>
          <Typography component="h1" variant="h3">
            Other Job Skills
          </Typography>
          <TableContainer component={Paper} elevation={4}>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    th: {
                      fontSize: '1.5rem',
                    },
                  }}
                >
                  <TableCell align="right">Skill</TableCell>
                  <TableCell align="right">Appears in # of Jobs</TableCell>
                  <TableCell align="right">Appears in % of Jobs</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderSkillRow(skillsStats.otherJobSkillsStats)}</TableBody>
            </Table>
          </TableContainer>
        </Stack>
      )}
    </Container>
  );
};
