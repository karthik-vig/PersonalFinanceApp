import { createSlice } from "@reduxjs/toolkit";

const failBoxSlice = createSlice({
    name: "analyticsPageStates/failBox",
    initialState: {
        state: "hidden",
        message: "",
    },
    reducers: {
        toggleFailBoxDisplay: (state) => {
            if (state.state === "hidden")
            state.state = "block";
            else state.state = "hidden";
        },
        setFailBoxMessage: (state, action) => {
            state.message = action.payload;
        }
    },
});

export const {
    toggleFailBoxDisplay,
    setFailBoxMessage,
} = failBoxSlice.actions;

export default failBoxSlice.reducer;