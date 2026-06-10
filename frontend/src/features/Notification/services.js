import API from "../../services/api"
export const loadMedicine = async () => 
    await API.get('http://localhost:4000/api/medicines')
          
export const deleteMedicine = async (medicineId) =>
  await API.delete(`http://localhost:4000/api/medicines/delete/${medicineId}`)