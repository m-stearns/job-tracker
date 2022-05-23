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
  skillsBankData: Skill[];
  userChosenExistingSkills: Skill[];
  setUserChosenExistingSkills: React.Dispatch<SetStateAction<Skill[]>>;
  userCreatedSkills: string[];
  setUserCreatedSkills: React.Dispatch<SetStateAction<string[]>>;
}> = ({
  skillsBankData,
  userChosenExistingSkills,
  setUserChosenExistingSkills,
  userCreatedSkills,
  setUserCreatedSkills,
}): React.ReactElement => {
  const [skillsBank] = useState<Skill[]>(skillsBankData);

  const [existingSkillName, setExistingSkillName] = useState<string>('');
  const [existingSkillId, setExistingSkillId] = useState<string>('-1');
  const [userCreatedSkillName, setUserCreatedSkillName] = useState<string>('');

  // toggles on/off the field to add brand new skills
  const [addNewSkillField, setAddNewSkillField] = useState<boolean>(false);

  const handleAddNewSkill = (chosenNewSkillName: string) => {
    let addSkill = true;
    for (let i = 0; i < userChosenExistingSkills.length; i++) {
      if (chosenNewSkillName.toLowerCase() === userChosenExistingSkills[0].name.toLowerCase()) {
        addSkill = false;
        break;
      }
    }
    for (let i = 0; i < userCreatedSkills.length; i++) {
      if (chosenNewSkillName.toLowerCase() == userCreatedSkills[i].toLowerCase()) {
        addSkill = false;
        break;
      }
    }
    if (chosenNewSkillName && addSkill) {
      setUserCreatedSkills([...userCreatedSkills, chosenNewSkillName]);
      setUserCreatedSkillName('');
    }
  };

  const handleAddExistingSkill = (skillName: string, skillId: string) => {
    const chosenExistingSkill: Skill = {
      id: skillId,
      name: skillName,
    };
    let addSkill = true;
    for (let i = 0; i < userChosenExistingSkills.length; i++) {
      if (chosenExistingSkill.id === userChosenExistingSkills[i].id) {
        addSkill = false;
        break;
      }
    }
    for (let i = 0; i < userCreatedSkills.length; i++) {
      if (chosenExistingSkill.name.toLowerCase() === userCreatedSkills[i].toLowerCase()) {
        addSkill = false;
        break;
      }
    }
    if (chosenExistingSkill.name && addSkill) {
      setUserChosenExistingSkills([...userChosenExistingSkills, chosenExistingSkill]);
      setUserCreatedSkillName('');
    }
  };

  const handleChipDeleteExistingSkill = (skillToDelete: Skill) => {
    let index = -1;
    for (let i = 0; i < userChosenExistingSkills.length; i++) {
      if (skillToDelete.id == userChosenExistingSkills[i].id) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      userChosenExistingSkills.splice(index, 1);
      setUserChosenExistingSkills([...userChosenExistingSkills]);
    }
  };

  const handleChipDeleteNewSkill = (skillName: string) => {
    let index = -1;
    for (let i = 0; i < userCreatedSkills.length; i++) {
      if (skillName == userCreatedSkills[i]) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      userCreatedSkills.splice(index, 1);
      setUserCreatedSkills([...userCreatedSkills]);
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
            {skillsBank.map((skill) => (
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
        {userChosenExistingSkills.map((skill) => (
          <Chip
            key={skill.id}
            label={skill.name}
            onDelete={() => {
              handleChipDeleteExistingSkill(skill);
            }}
          />
        ))}
        {userCreatedSkills.map((skillName) => (
          <Chip
            key={skillName}
            label={skillName}
            onDelete={() => {
              handleChipDeleteNewSkill(skillName);
            }}
          />
        ))}
      </Grid>
    </Box>
  );
};
