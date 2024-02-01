import { createSlice } from "@reduxjs/toolkit";

export const failBoxDisplaySlice = createSlice({
    name: "mainPage/failBoxDisplayState",
    initialState: { state: "hidden", message: ""},
    reducers: {
        showFailBox: (state, action) => {
            //action.payload = string of message
            state = { state: "block", message: action.payload };
            return state;
        },
        hideFailBox: (state) => {
            //action.payload = {display: boolean, message: string}
            state = { state: "hidden", message: "" };
            return state;
        },
    }
});

export const {  showFailBox,
                hideFailBox,
             } = failBoxDisplaySlice.actions;

export default failBoxDisplaySlice.reducer;