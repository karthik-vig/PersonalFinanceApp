import { createSlice } from "@reduxjs/toolkit";

export const successBoxDisplaySlice = createSlice({
    name: "mainPage/successBoxDisplayState",
    initialState: {state: "hidden", message: ""},
    reducers: {
        showSuccessBox: (state, action) => {
            //action.payload = string of a message to display
            state = {state: "block", message: action.payload};
            return state;
        },
        hideSuccessBox: (state) => {
            //action.payload = {display: boolean, message: string}
            state = {state: "hidden", message: ""};
            return state;
        },
    }
});

export const {  showSuccessBox,
                hideSuccessBox,
             } = successBoxDisplaySlice.actions;

export default successBoxDisplaySlice.reducer;