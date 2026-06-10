import axios from "axios";
import API from "../../../../services/api"
export const updateMedicine = async (newQuantity , medicineId ) =>
await API.put(`/medicines/${medicineId}`, {
                   quantity: newQuantity,
                 });
const url = "/transactions"; 
 export const postTransaction = async (transaction) =>
     await API.post(url, transaction);


export const fetchContacts = async () => 
    await API.get("/customer");