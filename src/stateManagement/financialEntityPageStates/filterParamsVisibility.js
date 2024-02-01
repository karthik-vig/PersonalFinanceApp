import { createSlice } from "@reduxjs/toolkit";

export const filterParamsVisibilitySlice = createSlice({
    name: "financialEntityPage/filterParamsVisibility",
    initialState: {
            type: false,
            createdDate: false,
            modifiedDate: false,
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