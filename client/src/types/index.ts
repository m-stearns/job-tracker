export interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface UserInputData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phoneNo: string;
  company: string;
}

export interface JobRowData {
  id: string;
  title: string;
  company: string;
  description: string;
  status: string;
  link: string;
  internship: boolean;
}

export interface JobPageData extends JobRowData {
  skills: Skill[];
  contact: Contact;
}

export interface JobNewData extends Omit<JobRowData, 'skills'> {
  newSkills: Skill[];
  existingSkills: Skill[];
}

export interface UserSkillStat {
  id: string;
  name: string;
  comfortLevel: number;
  count: number;
  appearsInPercentageOfJobs: number;
}

interface OtherJobSkillStat {
  id: string;
  name: string;
  count: number;
  appearsInPercentageOfJobs: number;
}

export interface SkillStats {
  userSkillsStats: UserSkillStat[];
  otherJobSkillsStats: OtherJobSkillStat[];
}
