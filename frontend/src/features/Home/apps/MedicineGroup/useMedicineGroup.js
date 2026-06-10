import { useState , useEffect } from "react";
import { useSelector } from "react-redux";
import {fetchMedicineGroup} from "./services"

export const useMedicineGroup = () =>{

    const [medicineGroup , setMedicineGroup] = useState([]);
 
const selectedGroupId = useSelector(state => state.slice.selectedGroupId);
console.log(selectedGroupId)
    useEffect(() =>{
  const loadMedicineGroup = async () =>{
        try{
         const result = await fetchMedicineGroup(selectedGroupId);

         console.log(result)
          
         setMedicineGroup(result.data)
        }catch (error) {

            console.log(error)
        }
      

    } 
   
    loadMedicineGroup()
    }, [])
  

    return {medicineGroup}
}