import axios from "axios"

const token = localStorage.getItem("token")
export const deleteSuplier = async (id) => 
   await axios.delete(`http://localhost:4000/api/customer/${id}` , {
    headers:{
        Authorization:`Bearer ${token}`
    }
   })
