import API from "../../../services/api"



export const supplierCount = async () =>
  await API.get("/supplier");

export const countCustomer = async () =>
    await API.get("/customer")