import { createSlice } from "@reduxjs/toolkit";

export const failBoxDisplaySlice = createSlice({
    name: "mainPage/failBoxDisplayState",
    initialState: "hidden",
    reducers: {
        showFailBox: (state) => {
            //action.payload = {display: boolean, message: string}
            state = "block";
            return state;
        },
        hideFailBox: (state) => {
            //action.payload = {display: boolean, message: string}
            state = "hidden";
            return state;
        },
    }
});

export const {  showFailBox,
                hideFailBox,
             } = failBoxDisplaySlice.actions;

export default failBoxDisplaySlice.reducer;