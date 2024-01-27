import { createSlice } from "@reduxjs/toolkit";

export const successBoxDisplaySlice = createSlice({
    name: "mainPage/successBoxDisplayState",
    initialState: "hidden",
    reducers: {
        showSuccessBox: (state) => {
            //action.payload = {display: boolean, message: string}
            state = "block";
            return state;
        },
        hideSuccessBox: (state) => {
            //action.payload = {display: boolean, message: string}
            state = "hidden";
            return state;
        },
    }
});

export const {  showSuccessBox,
                hideSuccessBox,
             } = successBoxDisplaySlice.actions;

export default successBoxDisplaySlice.reducer;