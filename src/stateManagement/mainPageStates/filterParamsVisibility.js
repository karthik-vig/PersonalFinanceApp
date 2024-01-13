import { createSlice } from "@reduxjs/toolkit";

export const filterParamsVisibilitySlice = createSlice({
    name: "filterParamsVisibility",
    initialState: {
            value: false,
            currency: false,
            transactionType: false,
            transactionCategory: false,
            fromType: false,
            fromEntity: false,
            toType: false,
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
    }
});

export const { toggleFilterParamsVisibility } = filterParamsVisibilitySlice.actions;

export default filterParamsVisibilitySlice.reducer;