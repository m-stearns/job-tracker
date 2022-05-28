import type { JobPageData, Skill, Contact } from '../types';

export const createJobPageData = (data: any, skills: Skill[], contact: Contact) => {
  const jobPageData: JobPageData = {
    id: data.id,
    title: data.title,
    company: data.company,
    description: data.description,
    status: data.status,
    link: data.link,
    internship: data.internship,
    skills: skills,
    contact: contact,
  };
  return jobPageData;
};

export const createContact = (
  contactsData: {
    id: string;
    name: string;
    email: string;
    phoneNo: string;
    company: string;
  }[],
) => {
  const contact: Contact = {
    id: '-1',
    name: '',
    email: '',
    phoneNo: '',
    company: '',
  };
  if (contactsData.length > 0) {
    contact.name = contactsData[0]['name'];
    contact.email = contactsData[0]['email'];
    contact.phoneNo = contactsData[0]['phoneNo'];
    contact.company = contactsData[0]['company'];
  }
  return contact;
};

export const createSkills = (skillsData: any[]) => {
  const skills: Skill[] = [];
  if (skillsData) {
    for (let i = 0; i < skillsData.length; i++) {
      const skill: Skill = {
        id: skillsData[i].skill['id'],
        name: skillsData[i].skill['name'],
      };
      skills.push(skill);
    }
  }
  return skills;
};
