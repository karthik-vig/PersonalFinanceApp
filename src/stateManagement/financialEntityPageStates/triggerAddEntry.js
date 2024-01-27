import { createSlice } from "@reduxjs/toolkit";

export const triggerAddEntrySlice = createSlice({
    name: "financialEntityPage/triggerAddEntryState",
    initialState: false,
    reducers: {
        triggerAddEntry: (state) => {
            state = true;
            return state;
        },
        resetTriggerAddEntry: (state) => {
            state = false;
            return state;
        },
    }
});

export const {  triggerAddEntry,
                resetTriggerAddEntry,
             } = triggerAddEntrySlice.actions;

export default triggerAddEntrySlice.reducer;