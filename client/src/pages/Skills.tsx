import { useEffect, useState } from 'react';
import { fetchSkillsStats } from '../repository';
import {
  Container,
  Typography,
  Stack,
  Paper,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
} from '@mui/material';
import { UserSkillStat } from '../types';

export const Skills = () => {
  const [skillsStats, setSkillsStats] = useState<UserSkillStat[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchSkillsStats();
      setSkillsStats(data.userSkillsStats as any);
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Stack spacing={4} sx={{ py: '24px' }}>
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
            <TableBody>
              {skillsStats.map((skill) => (
                <TableRow key={skill.id}>
                  <TableCell align="right">{skill.name}</TableCell>
                  <TableCell align="right">{skill.comfortLevel}</TableCell>
                  <TableCell align="right">{skill.count}</TableCell>
                  <TableCell align="right">{skill.appearsInPercentageOfJobs}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
};
