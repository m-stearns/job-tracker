import React, { SetStateAction, useState } from 'react';
import { Button, TextField, Typography, Grid, Box, Chip } from '@mui/material';

export type skillDataRecord = {
  name: string;
  rating: number;
};

export const SkillsUpdate: React.FC<{
  skillsData: skillDataRecord[];
  setSkills: React.Dispatch<SetStateAction<skillDataRecord[]>>;
}> = ({ skillsData, setSkills }): React.ReactElement => {
  const [skillName, setSkillName] = useState<string>('');
  const [skillRating, setSkillRating] = useState<number>(0);

  const minRating = 1;
  const maxRating = 5;

  const handleSkillNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSkillName(event.target.value);
  };
  const handleSkillRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(event.target.value);
    setSkillRating(num);
  };
  const handleCreateSkill = () => {
    const newSkill: skillDataRecord = {
      name: skillName,
      rating: skillRating,
    };
    skillsData.push(newSkill);
    setSkills([...skillsData]);
  };
  const handleChipDelete = (skillName: string) => {
    let index = -1;
    for (let i = 0; i < skillsData.length; i++) {
      if (skillName == skillsData[i].name) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      skillsData.splice(index, 1);
      setSkills([...skillsData]);
    }
  };

  return (
    <Box width="400px">
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="standard"
          type="text"
          name="skillName"
          label="Skill Name"
          value={skillName}
          onChange={handleSkillNameChange}
        />
      </Grid>
      <Grid item xs={12} style={{ marginBottom: '20px' }}>
        <TextField
          fullWidth
          variant="standard"
          type="number"
          label="Comfort Rating"
          inputProps={{ inputMode: 'numeric', inputProps: { max: maxRating, min: minRating } }}
          onChange={handleSkillRatingChange}
        />
      </Grid>
      <Grid item xs={12} style={{ marginBottom: '48px' }}>
        <Button color="primary" onClick={handleCreateSkill} sx={{ borderRadius: 28 }} variant="contained">
          <Typography variant="body2">Submit</Typography>
        </Button>
      </Grid>
      <Grid item xs={12} style={{ marginBottom: '48px' }}>
        {skillsData.map((skill) => (
          <Chip
            key={skill.name}
            label={skill.name + ': ' + skill.rating}
            onDelete={() => {
              handleChipDelete(skill.name);
            }}
          />
        ))}
      </Grid>
    </Box>
  );
};
