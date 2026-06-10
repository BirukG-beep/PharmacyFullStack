import API from "../../services/api";

export const fetch = async () =>
  await API.get("/sales/totalsale");

export const countMedicine = async () =>
  await API.get("/medicines/medcount");

export const Medicines = async () =>
  await API.get("/medicines");

export const HighSold = async () =>
  await API.get("/sales/highest-sold");

export const supplierCount = async () =>
  await API.get("/supplier");

export const UserCount = async () =>
  await API.get("/supplier/count");

export const countCustomer = async () =>
    await API.get("/customer")