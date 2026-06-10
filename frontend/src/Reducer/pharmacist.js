import { createSlice } from "@reduxjs/toolkit";

const Pharmacist = createSlice ({
    name:"pharmacist",
    initialState:{
        pharmacist: ''
    },
    reducers:{
        SetPharmacist : (state , actions) =>{
              state.pharmacist = actions.payload
        }
    }
}) 

export const {SetPharmacist} = Pharmacist.actions;

export default Pharmacist.reducer;