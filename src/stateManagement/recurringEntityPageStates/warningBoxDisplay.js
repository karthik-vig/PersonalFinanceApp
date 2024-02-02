import { createSlice } from "@reduxjs/toolkit";

export const warningBoxDisplaySlice = createSlice({
    name: "recurringEntityPage/warningBoxDisplayState",
    initialState: {
        refreshBtn: "hidden",
        addBtn: "hidden",
        modifyBtn: "hidden",
        deleteBtn: "hidden",
    },
    reducers: {
        setWarningBoxDisplayModifyState: (state, action) => {
            //action.payload = string value of block or hidden
            state.modifyBtn = action.payload;
        },
        setWarningBoxDisplayAddState: (state, action) => {
            //action.payload = string value of block or hidden
            state.addBtn = action.payload;
        },
        setWarningBoxDisplayDeleteState: (state, action) => {
            //action.payload = string value of block or hidden
            state.deleteBtn = action.payload;
        },
        setWarningBoxDisplayRefreshState: (state, action) => {
            //action.payload = string value of block or hidden
            state.refreshBtn = action.payload;
        },
    }
});

export const {  setWarningBoxDisplayModifyState,
                setWarningBoxDisplayAddState,
                setWarningBoxDisplayDeleteState,
                setWarningBoxDisplayRefreshState,
             } = warningBoxDisplaySlice.actions;

export default warningBoxDisplaySlice.reducer;