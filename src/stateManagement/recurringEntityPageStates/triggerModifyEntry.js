import { createSlice } from "@reduxjs/toolkit"; 

export const triggerModifyEntrySlice = createSlice({
    name: "recurringEntityPage/triggerModifyEntryState",
    initialState: false,
    reducers: {
        triggerModifyEntry: (state) => {
            //no action payload
            state = true;
            return state;
        },
        resetTriggerModifyEntry: (state) => {
            //no action payload
            state = false;
            return state;
        },
    }
});

export const {  triggerModifyEntry,
                resetTriggerModifyEntry,
             } = triggerModifyEntrySlice.actions;

export default triggerModifyEntrySlice.reducer;