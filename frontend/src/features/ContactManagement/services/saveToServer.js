import API from "../../../services/api"
export const saveToServer = async (contactsToSave) => 
     await API.post("/customer", contactsToSave);

export const updateContactToServer = async (id, updatedContact) =>
           await API.put(`/customer/${id}`, updatedContact);    

