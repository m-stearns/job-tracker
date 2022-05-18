import { ContactsUpdate, ContactRowData } from '../common/ContactsUpdate';
export const ContactsEdit = () => {
  const contactData: ContactRowData = {
    name: '',
    email: '',
    phone_no: '',
    company: '',
  };
  return <ContactsUpdate title="Edit Contact" route="/contacts/view/:id" contactData={contactData} />;
};
