import API from "../../../services/api";

export const postMedicine = async (value) =>
  await API.post("/medicines/post", value);
export const supplier = async () =>
  await API.get("/supplier");