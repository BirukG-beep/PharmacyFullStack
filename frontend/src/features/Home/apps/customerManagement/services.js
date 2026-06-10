import axios from "axios";

const token = localStorage.getItem("token")

import API from "../../../../services/api"


export const add = async ({ name, email, phone }) =>
  await API.post('/supplier' , { name, email, phone } )

export const get = async () =>
  await API.get('/supplier')

export const deleteuser = async (id) =>
    await API.delete(`/supplier/${id}`)

export const edituser = async (id, value) => 
    await API.put(`/customer/${id}`, value);