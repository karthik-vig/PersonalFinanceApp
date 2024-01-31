import { createSlice } from "@reduxjs/toolkit";
//import  { useDispatch } from "react-redux";

export const selectedItemSlice = createSlice({
    name: "financialEntityPage/selectedItem",
    initialState: {
                    id: "", //uuidv4 template
                    title: null,
                    type: null, 
                    createdDate: "YYYY-MM-DDThh:mm",
                    modifiedDate: "YYYY-MM-DDThh:mm",
                },
    reducers: {
        handleItemClick: (state, action) => {
            //action.payload = {fieldName: string, fieldValue: string}
            state[action.payload.fieldName] = action.payload.fieldValue;
        },
        handleSelectItemClick: (state, action) => {
            /*action.payload = the selectedItem object structure with values
            */
           if (action.payload !== null){
                state = action.payload;
                return state;
           }
           else {
                state = {
                    id: "", //uuidv4 template
                    title: null,
                    type: null, 
                    createdDate: "YYYY-MM-DDThh:mm",
                    modifiedDate: "YYYY-MM-DDThh:mm",
                }
           }
           return state;
        },
        resetSelectedItem: (state) => {
            state = {
                id: "", //uuidv4 template
                title: null,
                type: null, 
                createdDate: "YYYY-MM-DDThh:mm",
                modifiedDate: "YYYY-MM-DDThh:mm",
            };
            return state;
        }

    }
});

export const {  handleItemClick, 
                handleSelectItemClick,
                resetSelectedItem
             } = selectedItemSlice.actions;

export default selectedItemSlice.reducer;