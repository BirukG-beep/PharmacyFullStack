

import API from "../../services/apiUser";

export const fetchUser = async () =>
    await API.get('/user');

export const deleteUser = async (username) =>
     await API.delete(`/user/${username}`);

export const updateUser = async (user) =>
  await API.put(`/user/update` , user )
    