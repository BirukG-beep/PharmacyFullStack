import API from "../../../services/api";

export const fetchMedicine = async () =>
     await API.get("/medicines");

export const deleteMedicine = async (id) =>
    await API.delete(`/medicine/${id}`)