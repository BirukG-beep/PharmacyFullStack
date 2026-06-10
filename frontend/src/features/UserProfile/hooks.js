
import { useState , useEffect } from "react";
import { fetchUser , deleteUser } from "./services";
import {toast} from 'react-toast'
export const useUserProfile = () => {
   const [users, setUsers] = useState([]);
       useEffect(() => {
          const loadUser = async () => {
          const result =  await fetchUser();
          console.log(result)
           setUsers(result.data)
         }
         loadUser();
       } ,[])

       const Delete = async (item) =>{ 
        console.log(item)
             const res = await deleteUser(item);

             if (res.status == 200){
  toast.success("User deleted successfully", {
          position: "top-right",
          autoClose: 3000, // auto close after 3 seconds
          hideProgressBar: false,
        });
             }
       }
       return {users , Delete}
}