
import API from "../../../../../../services/api"

export const getCosmo = () => API.get(`/cosmo/`);
export const createCosmo = (data) => API.post(`/cosmo/Cosmo`, data);
export const updateCosmo = (id, data) => API.put(`/cosmo/Cosmo/${id}`, data);
export const deleteCosmo = (id) => API.delete(`/cosmo/${id}`);
export const createSale = (data) => API.post(`/cosmo/salesTransaction`, data);
export const getSales = () => API.get(`/cosmo/salesTransaction`);
export const resetSales = () => API.delete(`/cosmo/CosmoTransactionDelte`);