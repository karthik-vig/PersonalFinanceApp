import { createSlice } from "@reduxjs/toolkit";

export const filterDisplaySlice = createSlice({
    name: "financialEntityPage/filterDisplayState",
    initialState: "hidden",
    reducers: {
        showFilter: (state) => {
            //action.payload = {display: boolean, message: string}
            state = "block";
            return state;
        },
        hideFilter: (state) => {
            //action.payload = {display: boolean, message: string}
            state = "hidden";
            return state;
        },
    }
});

export const {  showFilter,
                hideFilter,
             } = filterDisplaySlice.actions;

export default filterDisplaySlice.reducer;