import API from "../../../services/api"
export const fetchTotalSale = async () =>
 await API.get('/Sales/totalsale');
    
export const responseTotalSale = async () =>
 await API.get('/Sales/totalSell');
