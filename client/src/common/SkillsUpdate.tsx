import React, { SetStateAction, useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Grid,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

export type skillDataRecord = {
  name: string;
};

export const SkillsUpdate: React.FC<{
  skillsData: skillDataRecord[];
  existingSkillsData: skillDataRecord[];
  setSkills: React.Dispatch<SetStateAction<skillDataRecord[]>>;
}> = ({ skillsData, existingSkillsData, setSkills }): React.ReactElement => {
  // const skills = [{ name: 'python' }, { name: 'react' }];
  const [existingSkillName, setExistingSkillName] = useState<string>('');
  const [existingSkills] = useState<skillDataRecord[]>(existingSkillsData);
  const [userCreatedSkillName, setUserCreatedSkillName] = useState<string>('');
  const [addNewSkillField, setAddNewSkillField] = useState<boolean>(false);

  const handleAddSkill = (skillName: string) => {
    const newSkill: skillDataRecord = {
      name: skillName,
    };
    let addSkill = true;
    // if name of skill already exists in array, don't add the skill.
    for (let i = 0; i < skillsData.length; i++) {
      if (newSkill.name == skillsData[i].name) {
        addSkill = false;
        break;
      }
    }
    if (newSkill.name && addSkill) {
      skillsData.push(newSkill);
      setSkills([...skillsData]);
      setUserCreatedSkillName('');
    }
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

  const handleExistingSkillChange = (event: SelectChangeEvent) => {
    setExistingSkillName(event.target.value);
  };

  const handleUserCreatedSkillNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserCreatedSkillName(event.target.value);
  };

  const handleShowAddNewSkillField = () => {
    setAddNewSkillField(true);
  };

  const handleRemoveAddNewSkillField = () => {
    setAddNewSkillField(false);
  };

  return (
    <Box width="400px">
      <Grid>
        <FormControl fullWidth style={{ marginBottom: '24px' }}>
          <InputLabel id="skills-label">Skills</InputLabel>
          <Select
            labelId="skills-label"
            id="existing-skills"
            label="Skills"
            fullWidth
            variant="standard"
            value={existingSkillName}
            onChange={handleExistingSkillChange}
          >
            <MenuItem value="" onClickCapture={handleRemoveAddNewSkillField}></MenuItem>
            {existingSkills.map((skill) => (
              <MenuItem key={skill.name} value={skill.name} onClickCapture={handleRemoveAddNewSkillField}>
                {skill.name}
              </MenuItem>
            ))}
            <MenuItem value="other" onClickCapture={handleShowAddNewSkillField}>
              Other (Add new skill)
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {!addNewSkillField && (
        <Grid item xs={12} style={{ marginBottom: '24px' }}>
          <Button
            color="primary"
            sx={{ borderRadius: 28 }}
            variant="contained"
            onClick={() => {
              handleAddSkill(existingSkillName);
            }}
          >
            <Typography variant="body2">Add Skill</Typography>
          </Button>
        </Grid>
      )}
      {addNewSkillField && (
        <Box>
          <Grid item xs={12} style={{ marginBottom: '24px' }}>
            <TextField
              fullWidth
              variant="standard"
              type="text"
              name="skillName"
              label="Skill Name"
              value={userCreatedSkillName}
              onChange={handleUserCreatedSkillNameChange}
            />
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '24px' }}>
            <Button
              color="primary"
              onClick={() => {
                handleAddSkill(userCreatedSkillName);
              }}
              sx={{ borderRadius: 28 }}
              variant="contained"
            >
              <Typography variant="body2">Add Skill</Typography>
            </Button>
          </Grid>
        </Box>
      )}

      <Grid item xs={12} style={{ marginBottom: '48px' }}>
        {skillsData.map((skill) => (
          <Chip
            key={skill.name}
            label={skill.name}
            onDelete={() => {
              handleChipDelete(skill.name);
            }}
          />
        ))}
      </Grid>
    </Box>
  );
};
