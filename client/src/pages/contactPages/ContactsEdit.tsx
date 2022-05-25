import { ContactsUpdate } from '../../common/ContactsUpdate';
export const ContactsEdit = () => {
  return <ContactsUpdate title="Edit Contact" route="/contacts/view/:id" />;
};
