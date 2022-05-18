import { ContactsUpdate, ContactRowData } from '../common/ContactsUpdate';
export const CreateContact = () => {
  const contactData: ContactRowData = {
    name: '',
    email: '',
    phone_no: '',
    company: '',
  };
  return <ContactsUpdate title="Create Contact" route="/contacts" contactData={contactData} />;
};
