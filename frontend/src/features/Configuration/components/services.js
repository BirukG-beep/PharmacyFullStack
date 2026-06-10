import axios from "axios";

const token = localStorage.getItem('token');
export const loadUser = async () =>
    await axios.get('http://localhost:4000/users',{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })

 export const DeleteUser = async (id) => 
    await  axios.delete(`http://localhost:4000/users/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    } );

 export const EditUser = async (id , values) => 
      await axios.put(`http://localhost:4000/users/${id}`, values, {
        headers:{
            Authorization:`Bearer ${token}`
        }
    } )