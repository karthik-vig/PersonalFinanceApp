import { createSlice } from "@reduxjs/toolkit";

export const filterParamsVisibilitySlice = createSlice({
    name: "filterParamsVisibility",
    initialState: {
            entityType: false,
            createdDate: false,
            modifiedDate: false,
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