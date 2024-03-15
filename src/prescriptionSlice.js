import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    prescriptionList:[],
    editIndex:undefined,
    editData:undefined
}
const prescriptionSlice = createSlice({
    name:'prescriptions',
    initialState,
    reducers:{
        addPrescription(state,action){
            state.prescriptionList.push(action.payload)
        },
        editPrescription(state,action){
            state.editIndex = action.payload.index
            state.editData = action.payload.data
        },
        editedPrescriptionList(state,action){
            const { index, updatedItem } = action.payload;
            state.prescriptionList[index] = { ...state.prescriptionList[index], ...updatedItem };
            state.editIndex = undefined
        },
        deletePrescription(state,action){
            let deleteIndex = action.payload
            state.prescriptionList = state.prescriptionList.filter((val,index) => index !== deleteIndex)
        },
    }
})

export const { addPrescription,editPrescription, editedPrescriptionList, deletePrescription } = prescriptionSlice.actions
export default prescriptionSlice.reducer