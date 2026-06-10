import {fetch} from "./services"
import { useState , useEffect } from "react"
import { useSelector } from "react-redux";
export const useMedicine = () =>{
    const [medicines , setMedicines] = useState([]);
   

      const pharmacist = useSelector(
    (state) => state.pharmacist.pharmacist
  );
    

    useEffect(()=>{
        const loadMedicine = async () =>{
            const result = await fetch(pharmacist);
            setMedicines(result.data)
        } 
        loadMedicine();
    },[])
    return {medicines};
}