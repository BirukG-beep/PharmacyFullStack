import { saveToServer , updateContactToServer } from '../services/saveToServer';
import { deleteSuplier } from '../services/deleteContact';
export const onSubmit = (data, editIndex, contacts, setEditIndex, setContacts, reset, setContactDisplay) => {
  const contactWithDate = {
    ...data,
    dateTime: new Date().toLocaleString(),
  };


  let updatedContacts;
  if (editIndex !== null) {
    updatedContacts = [...contacts];
    updatedContacts[editIndex] = contactWithDate;
    updateContactToServer(updatedContacts[editIndex]._id, contactWithDate);
    setEditIndex(null);
  } else {
    updatedContacts = [...contacts, contactWithDate];
     saveToServer(contactWithDate);
  }

  setContacts(updatedContacts);
  reset();
  setContactDisplay(false);
};

export const handleEdit = (index, setEditIndex, reset, setContactDisplay, contacts) => {
  setEditIndex(index);
  reset(contacts[index]);
  setContactDisplay(true);

};
export const handleDelete = (index, contacts, setContacts) => {
  const updated = contacts.filter((_, i) => i !== index);
  console.log(updated)
  setContacts(updated);

   const deleted = contacts.filter((_, i) => i == index);
   const deleteInd = deleted[0];
  deleteSuplier(deleteInd._id);
};

export const handleEmail = (email) => {
  window.location.href = `mailto:${email}`;
};