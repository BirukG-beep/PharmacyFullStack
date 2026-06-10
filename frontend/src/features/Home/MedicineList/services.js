import API from "../../../services/api";

export const fetch = async (supplierId) =>
  await API.get(`/medicines/supplier/${supplierId}`);

