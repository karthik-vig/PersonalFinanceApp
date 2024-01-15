import { createSlice } from "@reduxjs/toolkit";

const additionalInformationSlice = createSlice({
    name: "additionalInformationState",
    initialState: {
        currencies: [],
        transactionCategories: [],
        transactionEntities: [],
    },
    reducers: {
        setCurrencies: (state, action) => {
            //action.payload = an array of strings, where each string is a currency abbreviation
            state.currencies = action.payload;
        },
        setTransactionCategories: (state, action) => {
            //action.payload = an array of strings, where each string is a transaction category name
            state.transactionCategories = action.payload;
        },
        setTransactionEntities: (state, action) => {
            //action.payload = an array of strings, where each string is a transaction entity object
            //where each object has the following properties: name and type, which are both strings
            state.transactionEntities = action.payload;
        },
    },
});

export const { setCurrencies, 
               setTransactionCategories, 
               setTransactionEntities,
            } = additionalInformationSlice.actions;

export default additionalInformationSlice.reducer;