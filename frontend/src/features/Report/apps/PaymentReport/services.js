import API from "../../../../services/api"
export const loadTransaction = async () => 
    await API.get('/transactions') 