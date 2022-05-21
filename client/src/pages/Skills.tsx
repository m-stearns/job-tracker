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
import { SkillStats } from '../types';

export const Skills = () => {
  // is fetching
  const [isFetching, setIsFetching] = useState(true);
  const [skillsStats, setSkillsStats] = useState<SkillStats | null>(null);

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
