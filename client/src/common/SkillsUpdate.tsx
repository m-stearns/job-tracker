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
import { Skill } from '../types';

export const SkillsUpdate: React.FC<{
  skillsData: Skill[];
  existingSkillsData: Skill[];
  setSkills: React.Dispatch<SetStateAction<Skill[]>>;
}> = ({ skillsData, existingSkillsData, setSkills }): React.ReactElement => {
  const [existingSkills] = useState<Skill[]>(existingSkillsData);

  // nextAvailableId is set as id attribute when the user creates a brand new skill
  existingSkills.sort((a, b) => parseInt(b.id) - parseInt(a.id));
  const id = parseInt(existingSkills[0].id) + 1;
  const [nextAvailableId, setNextAvailableId] = useState<string>(id.toString());

  const [existingSkillName, setExistingSkillName] = useState<string>('');
  const [existingSkillId, setExistingSkillId] = useState<string>('-1');
  const [userCreatedSkillName, setUserCreatedSkillName] = useState<string>('');
  // toggles on/off the field to add brand new skills
  const [addNewSkillField, setAddNewSkillField] = useState<boolean>(false);

  const handleAddNewSkill = (skillName: string) => {
    const newSkill: Skill = {
      id: nextAvailableId,
      name: skillName.trim(),
    };
    let addSkill = true;
    // if name of skill already exists in array, don't add the skill.
    for (let i = 0; i < skillsData.length; i++) {
      if (newSkill.name.toLowerCase() === skillsData[0].name.toLowerCase()) {
        addSkill = false;
        break;
      }
    }
    if (newSkill.name && addSkill) {
      setSkills([...skillsData, newSkill]);
      const id = parseInt(nextAvailableId) + 1;
      setNextAvailableId(id.toString());
    }
  };

  const handleAddExistingSkill = (skillName: string, skillId: string) => {
    const newSkill: Skill = {
      id: skillId,
      name: skillName,
    };
    let addSkill = true;
    // if id of skill already exists in array, or the name already exists in the array, don't add the skill.
    for (let i = 0; i < skillsData.length; i++) {
      if (newSkill.id === skillsData[i].id || newSkill.name.toLowerCase() === skillsData[i].name.toLowerCase()) {
        addSkill = false;
        break;
      }
    }
    if (newSkill.name && addSkill) {
      setSkills([...skillsData, newSkill]);
      setUserCreatedSkillName('');
    }
  };

  const handleChipDelete = (skillToDelete: Skill) => {
    let index = -1;
    for (let i = 0; i < skillsData.length; i++) {
      if (skillToDelete.id == skillsData[i].id) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      skillsData.splice(index, 1);
      setSkills([...skillsData]);
    }
  };

  const handleExistingSkillNameChange = (event: SelectChangeEvent) => {
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

  const handleSetExistingSkillId = (event: any) => {
    setExistingSkillId(event.target.id);
  };

  const handleExistingSkillClick = (event: any) => {
    handleRemoveAddNewSkillField();
    handleSetExistingSkillId(event);
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
            onChange={handleExistingSkillNameChange}
          >
            <MenuItem value="" onClickCapture={handleRemoveAddNewSkillField}></MenuItem>
            {existingSkills.map((skill) => (
              <MenuItem key={skill.id} id={skill.id} value={skill.name} onClickCapture={handleExistingSkillClick}>
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
              handleAddExistingSkill(existingSkillName, existingSkillId);
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
                handleAddNewSkill(userCreatedSkillName);
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
            key={skill.id}
            label={skill.name}
            onDelete={() => {
              handleChipDelete(skill);
            }}
          />
        ))}
      </Grid>
    </Box>
  );
};
