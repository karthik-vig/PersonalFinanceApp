import { createSlice } from "@reduxjs/toolkit";
//import  { useDispatch } from "react-redux";

export const selectedItemSlice = createSlice({
    name: "recurringEntityPage/selectedItem",
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
                    //recurringEntity: null,
                    //file: [], 
                    createdDate: "YYYY-MM-DDThh:mm:ss",
                    modifiedDate: "YYYY-MM-DDThh:mm:ss",
                    //transactionDate: "YYYY-MM-DDThh:mm:ss",
                    recurringFrequency: {},
                    recurringTransactionStartDate: "YYYY-MM-DDThh:mm:ss",
                    recurringTransactionEndDate: "YYYY-MM-DDThh:mm:ss",
                },
    reducers: {
        handleItemClick: (state, action) => {
            //action.payload = {fieldName: string, fieldValue: string}
            if (action.payload.fieldName.slice(0, 18) === "recurringFrequency") {
                state.recurringFrequency[action.payload.fieldName.slice(19)] = action.payload.fieldValue;
            } else {
                state[action.payload.fieldName] = action.payload.fieldValue;
            }
        },
        handleSelectItemClick: (state, action) => {
            /*action.payload = the selectedItem object structure with values
            */
           if (action.payload !== null){
                state = action.payload;
                return state;
           } else {
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
                    //recurringEntity: null,
                    //file: [], 
                    createdDate: "YYYY-MM-DDThh:mm:ss",
                    modifiedDate: "YYYY-MM-DDThh:mm:ss",
                    //transactionDate: "YYYY-MM-DDThh:mm:ss",
                    recurringFrequency: {},
                    recurringTransactionStartDate: "YYYY-MM-DDThh:mm:ss",
                    recurringTransactionEndDate: "YYYY-MM-DDThh:mm:ss",
                }
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
                //recurringEntity: null,
                //file: [], 
                createdDate: "YYYY-MM-DDThh:mm:ss",
                modifiedDate: "YYYY-MM-DDThh:mm:ss",
                //transactionDate: "YYYY-MM-DDThh:mm:ss",
                recurringFrequency: {},
                recurringTransactionStartDate: "YYYY-MM-DDThh:mm:ss",
                recurringTransactionEndDate: "YYYY-MM-DDThh:mm:ss",
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