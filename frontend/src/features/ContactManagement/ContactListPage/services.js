
import API from "../../../services/api"
export const fetchContacts = async () =>
 await API.get("/customer");

export const deleteContact = async (phone) =>
  await API.delete(`/customer/${phone}`);


export const deleteAllContacts = async () =>
  await API.delete('/customer');

export const saveContacts = async (contacts) =>
  await API.post('/customer', contacts);

export const updateContactToServer = async (id, updatedContact) =>
           await API.put(`/customer/${id}`, updatedContact);    

