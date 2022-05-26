import { useEffect, useState } from 'react';
import { fetchSkillsStats, fetchSkillsByUser, createUserSkill, deleteUserSkill, updateUserSkill } from '../repository';
import {
  Container,
  Typography,
  Stack,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Modal,
  Select,
  MenuItem,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Paper,
} from '@mui/material';
import { SkillStats, Skill, UserSkillStat } from '../types';

const EditComfortLevelModal = ({
  open,
  onClose,
  onNewSkillSuccess,
  currentSkill,
}: {
  open: boolean;
  onClose: () => void;
  onNewSkillSuccess: () => void;
  currentSkill: UserSkillStat;
}) => {
  const [newComfortLevel, setNewComfortLevel] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async () => {
    await updateUserSkill({ id: currentSkill.id, comfortLevel: newComfortLevel });
    onNewSkillSuccess();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  useEffect(() => {
    setNewComfortLevel(currentSkill.comfortLevel);
  }, [currentSkill]);

  return (
    <Modal open={open} onClose={onClose}>
      <>
        <Paper
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            padding: '2rem 1rem',
            minHeight: '10rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h5">Edit comfort level for {currentSkill.name}</Typography>
          {success && (
            <Typography variant="h6" color="primary">
              Successfully updated comfort level
            </Typography>
          )}
          <FormControl>
            <InputLabel>Comfort level</InputLabel>
            <Select value={newComfortLevel} onChange={(e) => setNewComfortLevel(Number(e.target.value))}>
              <MenuItem value={0}>
                <span role="img" aria-label="1">
                  ⭐
                </span>
              </MenuItem>
              <MenuItem value={1}>
                <span role="img" aria-label="2">
                  ⭐ ⭐
                </span>
              </MenuItem>
              <MenuItem value={2}>
                <span role="img" aria-label="3">
                  ⭐ ⭐ ⭐
                </span>
              </MenuItem>
              <MenuItem value={3}>
                <span role="img" aria-label="4">
                  ⭐ ⭐ ⭐ ⭐
                </span>
              </MenuItem>
              <MenuItem value={4}>
                <span role="img" aria-label="5">
                  ⭐ ⭐ ⭐ ⭐ ⭐
                </span>
              </MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Paper>
      </>
    </Modal>
  );
};

const AddSkillModal = ({
  isOpen,
  onClose,
  onNewSkillSuccess,
  currentUserSkills,
}: {
  isOpen: boolean;
  onClose: () => void;
  onNewSkillSuccess: () => void;
  currentUserSkills: SkillStats['userSkillsStats'];
}) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [newSkill, setNewSkill] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [comfortLevel, setComfortLevel] = useState<number>(0);

  const handleFetchSkills = async () => {
    const res = await fetchSkillsByUser();
    setSkills(res.data);
  };

  useEffect(() => {
    handleFetchSkills();
  }, []);

  const validateNewSkill = (skill: string) => {
    let valid = true;
    for (let i = 0; i < skills.length; i++) {
      if (skill.toLowerCase() === skills[i].name.toLowerCase()) {
        valid = false;
        break;
      }
    }
    return valid;
  };

  const clearMessages = () => {
    setTimeout(() => {
      setError('');
      setSuccess('');
    }, 3000);
  };

  const handleSubmit = async () => {
    if (newSkill) {
      if (validateNewSkill(newSkill)) {
        try {
          await createUserSkill({ newSkill, comfortLevel });
          setSuccess("Skill '" + newSkill + "' added successfully");
          setNewSkill('');
          setComfortLevel(0);
          clearMessages();
          onNewSkillSuccess();
        } catch (err: any) {
          setError(err.response.data.message);
          // remove set error message after 3 seconds
          clearMessages();
        }
      } else {
        // set error message
        setError("Skill '" + newSkill + "' already exists");
        clearMessages();
      }
    } else {
      try {
        await createUserSkill({ existingSkill: selectedSkill, comfortLevel });
        setSuccess('Added skill');
        setSelectedSkill('');
        setComfortLevel(0);
        clearMessages();
        onNewSkillSuccess();
      } catch (err: any) {
        setError(err.response.data.message);
        clearMessages();
      }
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Paper
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          padding: '2rem 1rem',
        }}
      >
        {success && (
          <Typography variant="body1" color="primary">
            {success}
          </Typography>
        )}
        {error && (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        )}
        <Container
          maxWidth="sm"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Stack
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h6">Add existing skill</Typography>
              <FormControl>
                <InputLabel id="skill-label">Skill</InputLabel>
                <Select
                  labelId="skill-label"
                  id="skill-select"
                  disabled={newSkill.length > 0}
                  onChange={(e) => {
                    setSelectedSkill(e.target.value as any);
                  }}
                >
                  {skills
                    .filter((skill) => !currentUserSkills.some((userSkill) => userSkill.id === skill.id))
                    .map((skill) => (
                      <MenuItem key={skill.id} value={skill.id}>
                        {skill.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>{' '}
            </Stack>

            <Stack
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                paddingTop: '1rem',
                paddingBottom: '1rem',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">OR</Typography>
            </Stack>

            <Stack spacing={2}>
              <Typography variant="h6">Add a New skill</Typography>
              <TextField
                label="Skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                helperText={error}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel id="comfort-level-label">Comfort level</InputLabel>
                <Select
                  labelId="comfort-level-label"
                  value={comfortLevel}
                  onChange={(e) => setComfortLevel(e.target.value as any)}
                  label="Comfort level"
                >
                  <MenuItem value={0}>
                    <span role="img" aria-label="1 star">
                      ⭐
                    </span>
                  </MenuItem>
                  <MenuItem value={1}>
                    <span role="img" aria-label="2 stars">
                      ⭐ ⭐
                    </span>
                  </MenuItem>
                  <MenuItem value={2}>
                    <span role="img" aria-label="3 stars">
                      ⭐ ⭐ ⭐
                    </span>
                  </MenuItem>
                  <MenuItem value={3}>
                    <span role="img" aria-label="4 stars">
                      ⭐ ⭐ ⭐ ⭐
                    </span>
                  </MenuItem>
                  <MenuItem value={4}>
                    <span role="img" aria-label="5 stars">
                      ⭐ ⭐ ⭐ ⭐ ⭐
                    </span>
                  </MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <div
              style={{
                paddingTop: '1rem',
              }}
            >
              <Button variant="contained" color="primary" type="submit">
                Add
              </Button>
            </div>
          </form>
        </Container>
      </Paper>
    </Modal>
  );
};

export const Skills = () => {
  // is fetching
  const [isFetching, setIsFetching] = useState(true);
  const [skillsStats, setSkillsStats] = useState<SkillStats | null>(null);
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
  const [hasAddedSkill, setHasAddedSkill] = useState(false);
  const [isEditComfortLevelModalOpen, setIsEditComfortLevelModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<UserSkillStat | null>(null);

  const fetchData = async () => {
    const { data } = await fetchSkillsStats();
    setSkillsStats(data);
  };

  // pull fresh data from server
  const onNewSkillSuccess = () => {
    if (hasAddedSkill) {
      setIsFetching(true);
      fetchData();
      setHasAddedSkill(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
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

  const handleDeleteSkill = async (skillId: number) => {
    try {
      await deleteUserSkill(skillId as any);
      setIsFetching(true);
      fetchData();
      setIsFetching(false);
    } catch (err: any) {
      console.log(err);
    }
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
          {/* @ts-expect-error todo maybe never */}
          {stat.comfortLevel != undefined ? (
            <>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setCurrentSkill(stat as any);
                    setIsEditComfortLevelModalOpen(true);
                  }}
                >
                  Edit
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  /* @ts-expect-error todo maybe never */
                  onClick={() => handleDeleteSkill(stat.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </>
          ) : null}
        </TableRow>
      );
    });
  };

  return (
    <Container maxWidth="lg">
      {isFetching && <Typography>Loading...</Typography>}
      {skillsStats?.userSkillsStats && !isFetching && (
        <Stack spacing={4} sx={{ py: '24px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography component="h1" variant="h3">
              My Skills
            </Typography>
            <Button variant="contained" color="secondary" onClick={() => setIsAddSkillModalOpen(true)}>
              Add a skill
            </Button>
          </div>
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
                  <TableCell align="right">Edit</TableCell>
                  <TableCell align="right">Delete</TableCell>
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

      <AddSkillModal
        currentUserSkills={skillsStats?.userSkillsStats || []}
        isOpen={isAddSkillModalOpen}
        onClose={() => {
          setIsAddSkillModalOpen(false);
          onNewSkillSuccess();
        }}
        onNewSkillSuccess={() => {
          setHasAddedSkill(true);
        }}
      />
      {currentSkill ? (
        <EditComfortLevelModal
          open={isEditComfortLevelModalOpen}
          onClose={() => {
            onNewSkillSuccess();
            setIsEditComfortLevelModalOpen(false);
          }}
          currentSkill={currentSkill}
          onNewSkillSuccess={() => {
            setHasAddedSkill(true);
          }}
        />
      ) : null}
    </Container>
  );
};
