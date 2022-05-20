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
  phone: string;
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

export interface JobData extends JobRowData {
  skills: Skill[];
  contact: Contact | undefined;
}
