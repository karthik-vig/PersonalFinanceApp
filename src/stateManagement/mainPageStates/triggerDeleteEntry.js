import { createSlice } from "@reduxjs/toolkit"; 

export const triggerDeleteEntrySlice = createSlice({
    name: "mainPage/triggerDeleteEntryState",
    initialState: false,
    reducers: {
        triggerDeleteEntry: (state) => {
            //no action payload
            state = true;
            return state;
        },
        resetTriggerDeleteEntry: (state) => {
            //no action payload
            state = false;
            return state;
        },
    }
});

export const {  triggerDeleteEntry,
                resetTriggerDeleteEntry,
             } = triggerDeleteEntrySlice.actions;

export default triggerDeleteEntrySlice.reducer;