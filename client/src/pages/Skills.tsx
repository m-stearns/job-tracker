import { useEffect, useState } from 'react';
import { fetchSkillsStats } from '../repository';
import { Table, TableCell, TableHead, TableBody, TableRow } from '@mui/material';
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
    <div>
      <h1>My Skills</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Skill</TableCell>
            <TableCell>Comfort Level</TableCell>
            <TableCell>Appears in % of Jobs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {skillsStats.map((skill) => (
            <TableRow key={skill.id}>
              <TableCell>{skill.name}</TableCell>
              <TableCell>{skill.comfortLevel}</TableCell>
              <TableCell>{skill.appearsInPercentageOfJobs}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
