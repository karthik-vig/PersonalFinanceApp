import { createSlice } from "@reduxjs/toolkit";

const additionalInformationSlice = createSlice({
    name: "sharedStates/additionalInformationState",
    initialState: {
        currencies: [],
        transactionCategories: [],
        transactionEntities: [],
        recurringTransactions: [],
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
        setRecurringTransactions: (state, action) => {
            //action.payload = an array of objects, where each object is a recurring transaction
            //where each object has the following properties: title, description, value, currency, transactionType, transactionCategory, fromReference, toReference, files, createdDate, modifiedDate, recurringFrequency, recurringDate
            state.recurringTransactions = action.payload;
        },
    },
});

export const { setCurrencies, 
               setTransactionCategories, 
               setTransactionEntities,
               setRecurringTransactions,
            } = additionalInformationSlice.actions;

export default additionalInformationSlice.reducer;