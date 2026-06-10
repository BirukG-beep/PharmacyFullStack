import API from "../../../../../services/api"
export const fetch = async () => 
    await API.get('/medicines')