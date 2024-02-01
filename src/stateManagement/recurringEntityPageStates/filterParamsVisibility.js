import { createSlice } from "@reduxjs/toolkit";

export const filterParamsVisibilitySlice = createSlice({
    name: "mainPage/filterParamsVisibility",
    initialState: {
            value: false,
            currency: false,
            transactionType: false,
            transactionCategory: false,
            fromEntity: false,
            toEntity: false,
            recurringEntity: false,
            createdDate: false,
            modifiedDate: false,
            transactionDate: false,
            sort: false,
        },
    reducers: {
        toggleFilterParamsVisibility: (state, action) => {
            //action.payload = string value of a fieldName
            state[action.payload] = !state[action.payload];
        },
        resetFilterParamsVisibility: (state) => {
            Object.keys(state).forEach(key => {
                state[key] = false;
            });
        }
    }
});

export const { toggleFilterParamsVisibility,
               resetFilterParamsVisibility,
 } = filterParamsVisibilitySlice.actions;

export default filterParamsVisibilitySlice.reducer;