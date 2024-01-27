import { createSlice } from "@reduxjs/toolkit";
//import  { useDispatch } from "react-redux";

export const selectedItemSlice = createSlice({
    name: "mainPage/selectedItem",
    initialState: {
                    id: "", //uuidv4 template
                    title: null,
                    description: null,
                    value: null,
                    currency: null,
                    transactionType: null,
                    transactionCategory: null,
                    fromEntity: null, //computed by backend
                    fromType: null,
                    toEntity: null, //computed by backend
                    toType: null,
                    recurringEntity: null,
                    file: [], 
                    createdDate: "YYYY-MM-DDThh:mm:ss",
                    modifiedDate: "YYYY-MM-DDThh:mm:ss",
                    transactionDate: "YYYY-MM-DDThh:mm:ss",
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
           return null;
        },
        resetSelectedItem: (state) => {
            state = {
                id: "", //uuidv4 template
                title: null,
                description: null,
                value: null,
                currency: null,
                transactionType: null,
                transactionCategory: null,
                fromEntity: null, //computed by backend
                fromType: null,
                toEntity: null, //computed by backend
                toType: null,
                recurringEntity: null, //computed by backend, could be null
                file: [],
                createdDate: "yyyy-MM-ddThh:mm:ss",
                modifiedDate: "yyyy-MM-ddThh:mm:ss",
                transactionDate: "yyyy-MM-ddThh:mm:ss",
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