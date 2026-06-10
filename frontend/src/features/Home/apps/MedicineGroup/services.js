import API from "../../../../services/api"
export const fetchMedicineGroup = async (selectedGroupId) =>
    
    await API.get(`/medicinesGroup/${selectedGroupId}` );
