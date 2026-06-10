import {useEffect , useState} from "react";
import {postMedicine , supplier} from "./services"
export const useMedicineForm = () =>{
  
    const [data , setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await supplier();
            setData(result.data)
        }
        fetchData();
    },[])
    
    const handleSubmit = async (body) => {
        try{
        console.log(body)
       const result = await postMedicine(body)
       console.log(result)
    }  catch(error){
        console.log(error)
    }
}

return {handleSubmit , data}
}