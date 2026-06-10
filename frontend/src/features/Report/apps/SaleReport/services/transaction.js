import API from "../../../../../services/api"
export const transaction = async () =>
     await API.get('/transactions')
     