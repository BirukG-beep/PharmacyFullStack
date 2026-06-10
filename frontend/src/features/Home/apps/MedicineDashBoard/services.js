import API from "../../../../services/api"
export const loadMedicine = async () =>
     await API.get('/medicines' );

export const fetchMark = async () =>{
    await API.get('/medicines/mark' );
}


export const deleteMedicineApi = async (id) =>{
          await API.delete(`/medicines/${id}`);
}

export const handleMark = async (medicine) =>{
   await API.post('/medicines/mark', { medicine });
}